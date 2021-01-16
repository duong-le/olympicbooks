import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { FREE_SHIPPING_ORDER_VALUE_THRESHOLD } from '../../shared/Constants/transaction.constant';
import { DeliveryState } from '../../shared/Enums/delivery-state.enum';
import { Product } from '../products/products.entity';
import { ShippingMethod } from '../shippings/shipping-methods.entity';
import { OrderItem } from './orders-item/orders-item.entity';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>
  ) {
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

    return this.orderRepository.save({
      ...order,
      ...dto,
      transaction: { ...order.transaction, ...dto.transaction },
      shipping: { ...order.shipping, ...dto.shipping }
    });
  }

  async createOrder(dto: CreateOrderDto, userId: number): Promise<Order> {
    const order = this.orderRepository.create({ ...dto, userId });
    const shippingMethod = await this.shippingMethodRepository.findOne(dto.shipping.shippingMethodId);
    const products = await this.productRepository.findByIds(dto.orderItems.map((el) => el.productId));

    order.orderItems = order.orderItems.map((orderItem) => {
      const product = products.find((product) => product.id === orderItem.productId);
      orderItem.totalValue = orderItem.quantity * product.price;
      return orderItem;
    });

    order.transaction.value = order.orderItems.reduce((total: number, current: OrderItem) => (total += current.totalValue), 0);

    if (order.transaction.value < FREE_SHIPPING_ORDER_VALUE_THRESHOLD) {
      order.shipping.fee = shippingMethod.fee;
      order.transaction.value += order.shipping.fee;
    }
    return await this.orderRepository.save(order);
  }
}
