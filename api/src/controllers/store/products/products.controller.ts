import { Controller, NotFoundException, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';

import { Product } from '../../../entities/products.entity';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';
import { ProductCollectionType, ProductStatus } from '../../../shared/Enums/products.enum';
import { ShopStatus } from '../../../shared/Enums/shops.enum';

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
      category: { eager: true },
      publisher: { eager: true },
      authors: { eager: true },
      shop: { eager: true }
    },
    filter: [
      {
        field: 'status',
        operator: '$in',
        value: [ProductStatus.ACTIVE, ProductStatus.SOLD_OUT]
      },
      {
        field: 'shop.status',
        operator: '$eq',
        value: ShopStatus.ACTIVE
      }
    ],
    exclude: ['categoryId', 'publisherId', 'shopId']
  }
})
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService, public categoriesService: CategoriesService) {}

  @Override()
  @ApiQuery({ name: 'type', required: false })
  getMany(
    @ParsedRequest() req: CrudRequest,
    @Query('type') type: string
  ): Promise<GetManyDefaultResponse<Product> | Product[]> {
    if (type === ProductCollectionType.TOP_SELLING)
      return this.service.getTopSellingProducts(req.parsed.limit);
    return this.service.getMany(req);
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest): Promise<Product> {
    const product = await this.service.getOne(req);
    if (!product) throw new NotFoundException('Product not found');

    if (product?.category?.id) {
      product.category = await this.categoriesService.getCategoryAncestorAndDescendants(product.category);
    }
    return product;
  }
}
