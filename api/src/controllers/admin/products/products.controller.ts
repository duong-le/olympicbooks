import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, GetManyDefaultResponse, Override, ParsedRequest } from '@nestjsx/crud';

import { Product } from '../../../entities/products.entity';
import { ProductsService } from '../../../services/products.service';
import { AdminUpdateProductDto } from './products.dto';

@ApiTags('Admin Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Product },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase']
  },
  query: {
    join: {
      images: { eager: true },
      category: { eager: true },
      shop: { eager: true }
    },
    exclude: ['categoryId', 'shopId']
  },
  dto: { update: AdminUpdateProductDto }
})
export class AdminProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest): Promise<GetManyDefaultResponse<Product> | Product[]> {
    const products = await this.service.getMany(req);
    for (const product of Array.isArray(products) ? products : products.data) {
      product['attributes'] = await this.service.getProductAttributes(product.id, product.category.id);
    }
    return products;
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest): Promise<Product> {
    const product = await this.service.getOne(req);
    product['attributes'] = await this.service.getProductAttributes(product.id, product.category.id);
    return product;
  }
}
