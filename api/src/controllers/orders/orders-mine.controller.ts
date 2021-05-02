import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, Override, ParsedBody } from '@nestjsx/crud';

import { UserInfo } from '../../core/Decorators/user-info.decorator';
import { OrdersService } from '../../services/orders.service';
import { Role } from '../../shared/Enums/roles.enum';
import { User } from '../users/users.entity';
import { CreateOrderDto } from './orders.dto';
import { Order } from './orders.entity';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('mine/orders')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Order },
  routes: { only: ['getOneBase', 'getManyBase', 'createOneBase'] },
  query: {
    join: {
      orderItems: { eager: true, exclude: ['orderId', 'productId'] },
      'orderItems.product': { eager: true },
      transaction: { eager: true, exclude: ['transactionMethodId'] },
      'transaction.transactionMethod': { eager: true },
      shipping: { eager: true, exclude: ['shippingMethodId'] },
      'shipping.shippingMethod': { eager: true },
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
    return this.service.createOrder(dto, user.id);
  }
}
