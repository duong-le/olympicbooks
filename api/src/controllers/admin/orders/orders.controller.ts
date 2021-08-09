import { Controller, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';

import { Order } from '../../../entities/orders.entity';
import { OrdersService } from '../../../services/orders.service';
import { ShippingState } from '../../../shared/Enums/shippings.enum';
import { UpdateOrderDto } from './orders.dto';

@ApiTags('Admin Orders')
@ApiBearerAuth()
@Controller('admin/orders')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Order },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase']
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
  constructor(
    public service: OrdersService,
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  @Override()
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UpdateOrderDto): Promise<Order> {
    const order = await this.service.getOne(req);
    if (!order) throw new NotFoundException('Order not found');

    if (dto?.transaction?.state) order.transaction.state = dto.transaction.state;

    if (dto?.shipping?.state) {
      order.shipping.state = dto.shipping.state;

      switch (dto.shipping.state) {
        case ShippingState.DELIVERED:
          if (!order.shipping.deliveryDate) order.shipping.deliveryDate = new Date();
          break;
        case ShippingState.CANCELLED:
          order.shipping.deliveryDate = null;
          break;
      }
    }

    if (dto?.shipping?.fee) {
      order.transaction.value += -order.shipping.fee + dto.shipping.fee;
      order.shipping.fee = dto.shipping.fee;
    }

    if (dto?.shipping?.code) order.shipping.code = dto.shipping.code;

    if (dto?.buyerNote) order.buyerNote = dto.buyerNote;

    if (dto?.sellerNote) order.sellerNote = dto.sellerNote;

    return await this.orderRepository.save(order);
  }
}
