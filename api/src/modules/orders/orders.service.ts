import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(@InjectRepository(OrderRepository) private orderRepository: OrderRepository) {
    super(orderRepository);
  }
}
