import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, Override, ParsedBody } from '@nestjsx/crud';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { Customer } from '../../../entities/customers.entity';
import { Order } from '../../../entities/orders.entity';
import { OrdersService } from '../../../services/orders.service';
import { CreateOrderDto } from './orders.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('customers/me/orders')
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
  filter: (customer: Customer) => ({ customerId: customer.id })
})
export class OrdersController implements CrudController<Order> {
  constructor(public service: OrdersService) {}

  @Override()
  createOne(@ParsedBody() dto: CreateOrderDto, @UserInfo() customer: Customer): Promise<Order> {
    return this.service.createOrder(dto, customer.id);
  }
}
