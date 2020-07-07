import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductImage } from './product-images.entity';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto, UpdateProductImageDto } from './product-images.dto';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';

@ApiTags('Products')
@Controller('products/:productId/images')
@Crud({
  model: { type: ProductImage },
  params: { productId: { field: 'productId', type: 'number' } },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    createManyBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreateProductImageDto, update: UpdateProductImageDto }
})
export class ProductImagesController implements CrudController<ProductImage> {
  constructor(public service: ProductImagesService) {}
}
