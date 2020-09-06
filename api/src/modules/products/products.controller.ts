import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@ApiTags('Products')
@Controller('products')
@Crud({
  model: { type: Product },
  query: {
    join: {
      images: { eager: true },
      category: { eager: true },
      publisher: { eager: true },
      authors: { eager: true }
    },
    exclude: ['categoryId', 'publisherId']
  },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreateProductDto, update: UpdateProductDto }
})
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
