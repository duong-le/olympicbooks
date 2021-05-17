import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Order } from '../../../entities/orders.entity';
import { OrdersService } from '../../../services/orders.service';

@ApiTags('Admin Orders')
@ApiBearerAuth()
@Controller('admin/orders')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Order },
  routes: {
    only: ['getManyBase', 'getOneBase']
  },
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
  }
})
export class AdminOrdersController implements CrudController<Order> {
  constructor(public service: OrdersService) {}
}
