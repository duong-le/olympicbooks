import { Controller, UseGuards, UseInterceptors, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override, ParsedBody, CrudAuth, CrudRequestInterceptor } from '@nestjsx/crud';
import { CartItem } from './carts.entity';
import { CartsService } from './carts.service';
import { CreateCartItemDto, UpdateCartItemDto } from './carts.dto';
import { User } from '../users/users.entity';
import { UserInfo } from 'src/shared/Decorators/user-info.decorator';

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
    return this.service.deleteMany(user);
  }
}
