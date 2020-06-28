import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('carts')
@UseGuards(AuthGuard())
@Crud({ model: { type: Cart } })
export class CartsController implements CrudController<Cart> {
  constructor(public service: CartsService) {}
}
