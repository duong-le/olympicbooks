import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { UpdateOrderDto } from '../controllers/store/orders/orders.dto';
import { OrderItem } from '../entities/orders-item.entity';
import { Order } from '../entities/orders.entity';
import { DeliveryState } from '../shared/Enums/delivery-state.enum';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {
    super(orderRepository);
  }

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    switch (dto?.shipping?.state) {
      case DeliveryState.DELIVERED:
        if (!order.shipping.deliveryDate) order.shipping.deliveryDate = new Date();
        break;
      case DeliveryState.CANCELLED:
        order.shipping.deliveryDate = null;
        break;
    }

    if (dto?.shipping?.fee) order.transaction.value += -order.shipping.fee + dto.shipping.fee;

    return await this.orderRepository.save({
      ...order,
      ...dto,
      transaction: { ...order.transaction, ...dto.transaction },
      shipping: { ...order.shipping, ...dto.shipping }
    });
  }

  calculateOrderValue(orderItems: OrderItem[], shippingFee: number): number {
    return (
      orderItems.reduce((total: number, current: OrderItem) => (total += current.totalValue), 0) + shippingFee
    );
  }
}
