import { Controller, NotFoundException, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest
} from '@rewiko/crud';

import { Product } from '../../../entities/products.entity';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';
import { ProductCollectionType, ProductStatus } from '../../../shared/Enums/products.enum';

@ApiTags('Products')
@Controller('products')
@Crud({
  model: { type: Product },
  routes: {
    only: ['getManyBase', 'getOneBase']
  },
  query: {
    join: {
      images: { eager: true },
      category: { eager: true }
    },
    filter: [
      {
        field: 'status',
        operator: '$in',
        value: [ProductStatus.ACTIVE, ProductStatus.SOLD_OUT]
      }
    ],
    exclude: ['categoryId']
  }
})
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService, public categoriesService: CategoriesService) {}

  @Override()
  @ApiQuery({ name: 'type', required: false })
  async getMany(
    @ParsedRequest() req: CrudRequest,
    @Query('type') type: string
  ): Promise<GetManyDefaultResponse<Product> | Product[]> {
    const products =
      type === ProductCollectionType.TOP_SELLING
        ? await this.service.getTopSellingProducts(req.parsed.limit)
        : await this.service.getMany(req);

    for (const product of Array.isArray(products) ? products : products.data) {
      product['attributes'] = await this.service.getProductAttributes(product.id, product.category.id);
    }
    return products;
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest): Promise<Product> {
    const product = await this.service.getOne(req);
    if (!product) throw new NotFoundException('Product not found');

    if (product?.category?.id) {
      product.category = await this.categoriesService.getCategoryAncestorsAndDescendants(product.category);
    }

    product['attributes'] = await this.service.getProductAttributes(product.id, product.category.id);

    return product;
  }
}
