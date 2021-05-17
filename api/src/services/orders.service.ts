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

  async getManyOrdersByShopAndSeller(shopId: number, sellerId: number): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .leftJoinAndSelect('order.transaction', 'transaction')
      .leftJoinAndSelect('transaction.transactionMethod', 'transactionMethod')
      .leftJoinAndSelect('order.shipping', 'shipping')
      .leftJoinAndSelect('shipping.shippingMethod', 'shippingMethod')
      .leftJoin('order.shop', 'shop')
      .leftJoin('shop.sellers', 'seller')
      .where('shop.id = :shopId', { shopId })
      .andWhere('seller.id = :sellerId', { sellerId })
      .getMany();
  }

  async getOneOrderByShopAndSeller(orderId: number, shopId: number, sellerId: number): Promise<Order> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .leftJoinAndSelect('order.transaction', 'transaction')
      .leftJoinAndSelect('transaction.transactionMethod', 'transactionMethod')
      .leftJoinAndSelect('order.shipping', 'shipping')
      .leftJoinAndSelect('shipping.shippingMethod', 'shippingMethod')
      .leftJoin('order.shop', 'shop')
      .leftJoin('shop.sellers', 'seller')
      .where('order.id = :orderId', { orderId })
      .andWhere('shop.id = :shopId', { shopId })
      .andWhere('seller.id = :sellerId', { sellerId })
      .getOne();
  }

  calculateOrderValue(orderItems: OrderItem[], shippingFee: number): number {
    return (
      orderItems.reduce((total: number, current: OrderItem) => (total += current.totalValue), 0) + shippingFee
    );
  }
}
