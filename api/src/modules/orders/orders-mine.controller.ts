import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudAuth, Override, ParsedBody } from '@nestjsx/crud';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { User } from '../users/users.entity';
import { UserInfo } from 'src/shared/Decorators/user-info.decorator';
import { Role } from 'src/shared/Enums/roles.enum';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('mine/orders')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Order },
  routes: { exclude: ['createManyBase', 'updateOneBase', 'replaceOneBase', 'deleteOneBase'] },
  query: {
    join: {
      orderItems: { eager: true, exclude: ['orderId', 'productId'] },
      'orderItems.product': { eager: true },
      transaction: { eager: true },
      shipping: { eager: true },
      discount: { eager: true }
    },
    exclude: ['transactionId', 'shippingId', 'discountId']
  },
  dto: { create: CreateOrderDto }
})
@CrudAuth({
  property: 'user',
  filter: (user: User) => (user.role === Role.ADMIN ? {} : { userId: user.id })
})
export class OrdersMineController implements CrudController<Order> {
  constructor(public service: OrdersService) {}

  @Override()
  createOne(@ParsedBody() dto: CreateOrderDto, @UserInfo() user: User): Promise<Order> {
    dto.userId = user.id;
    return this.service.createOrder(dto);
  }
}
