import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../../../services/products.service';
import { ProductsController } from '../../store/products/products.controller';

@ApiTags('Admin Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(AuthGuard())
export class AdminProductsController extends ProductsController {
  constructor(public service: ProductsService) {
    super(service);
  }
}
