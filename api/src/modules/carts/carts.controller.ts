import { Controller, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, CrudRequestInterceptor, Override, ParsedBody } from '@nestjsx/crud';

import { UserInfo } from '../../core/Decorators/user-info.decorator';
import { User } from '../users/users.entity';
import { CreateCartItemDto, UpdateCartItemDto } from './carts.dto';
import { CartItem } from './carts.entity';
import { CartsService } from './carts.service';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('mine/carts')
@UseGuards(AuthGuard())
@Crud({
  model: { type: CartItem },
  query: {
    join: { product: { eager: true }, 'product.images': { eager: true } },
    exclude: ['userId', 'productId']
  },
  routes: { exclude: ['getOneBase', 'createManyBase', 'replaceOneBase'] },
  dto: { create: CreateCartItemDto, update: UpdateCartItemDto }
})
@CrudAuth({
  property: 'user',
  filter: (user: User) => ({ userId: user.id })
})
export class CartsController implements CrudController<CartItem> {
  constructor(public service: CartsService) {}

  @Override()
  createOne(@ParsedBody() dto: CreateCartItemDto, @UserInfo() user: User): Promise<CartItem> {
    return this.service.createCartItem(dto, user);
  }

  @ApiOperation({ summary: 'Delete many CartItem' })
  @UseInterceptors(CrudRequestInterceptor)
  @Delete()
  deleteMany(@UserInfo() user: User): Promise<void> {
    return this.service.deleteCartItems(user);
  }
}
