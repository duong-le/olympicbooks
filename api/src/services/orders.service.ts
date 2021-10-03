import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from '../entities/orders-item.entity';
import { Order } from '../entities/orders.entity';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {
    super(orderRepository);
  }

  calculateOrderValue(orderItems: OrderItem[]): number {
    return orderItems.reduce((total: number, current: OrderItem) => (total += current.totalValue), 0);
  }
}
