import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

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
      publisher: { eager: true },
      authors: { eager: true },
      shop: { eager: true }
    },
    exclude: ['categoryId', 'publisherId', 'shopId']
  },
  dto: { update: AdminUpdateProductDto }
})
export class AdminProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
