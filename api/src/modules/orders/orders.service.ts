import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Order } from './orders.entity';
import { OrderItem } from './orders-item/orders-item.entity';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { CreateOrderItemDto } from './orders-item/orders-item.dto';
import { Product } from '../products/products.entity';
import { ShippingMethod } from '../shippings/shipping-methods.entity';
import { DeliveryState } from 'src/shared/Enums/delivery-state.enum';

@Injectable()
export class OrdersService extends TypeOrmCrudService<Order> {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>
  ) {
    super(orderRepository);
  }

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) throw new NotFoundException('Order not found');

    switch (dto?.shipping?.state) {
      case DeliveryState.DELIVERED:
        if (!order.shipping.deliveryDate) order.shipping.deliveryDate = new Date();
        break;
      case DeliveryState.CANCELLED:
        order.shipping.deliveryDate = null;
        break;
    }

    return this.orderRepository.save({
      ...order,
      transaction: { ...order.transaction, ...dto.transaction },
      shipping: { ...order.shipping, ...dto.shipping }
    });
  }

  async createOrder(dto: CreateOrderDto, userId: number): Promise<Order> {
    const shippingMethod = await this.shippingMethodRepository.findOne(dto.shipping.shippingMethodId);
    const products = await this.productRepository.findByIds(dto.orderItems.map((el) => el.productId));

    dto.orderItems = this.addValueToOrderItem(dto.orderItems, products);
    dto.transaction.value = this.calculateTransactionValue(dto.orderItems) + shippingMethod.fee;

    const order = await this.orderRepository.save({ ...dto, userId });

    dto.orderItems = this.addOrderIdToOrderItem(dto.orderItems, order.id);
    await this.orderItemRepository.save(dto.orderItems);
    return order;
  }

  addValueToOrderItem(orderItems: CreateOrderItemDto[], products: Product[]): CreateOrderItemDto[] {
    return orderItems.map((orderItem) => {
      const product = products.find((product) => product.id === orderItem.productId);
      return { ...orderItem, totalValue: orderItem.quantity * product.price };
    });
  }

  calculateTransactionValue(orderItems: CreateOrderItemDto[]): number {
    return orderItems.reduce((total: number, current: CreateOrderItemDto) => (total += current.totalValue), 0);
  }

  addOrderIdToOrderItem(orderItems: CreateOrderItemDto[], orderId: number): CreateOrderItemDto[] {
    return orderItems.map((orderItem) => ({ ...orderItem, orderId }));
  }
}
