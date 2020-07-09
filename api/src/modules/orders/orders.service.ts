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

    if (dto?.state) order.state = dto.state;
    if (dto?.transaction?.state) order.transaction.state = dto.transaction.state;
    if (dto?.shipping?.estimation) order.shipping.estimation = dto.shipping.estimation;
    return await order.save();
  }

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const shippingMethod = await this.shippingMethodRepository.findOne(dto.shipping.shippingMethodId);
    const products = await this.productRepository.findByIds(dto.orderItems.map((el) => el.productId));

    dto.orderItems = this.addValueToOrderItem(dto.orderItems, products);
    dto.shipping.estimation = this.calculateEstimation(shippingMethod);
    dto.transaction.value = this.calculateTransactionValue(dto.orderItems) + shippingMethod.fee;

    const order = await this.orderRepository.save(dto);

    dto.orderItems = this.addOrderIdToOrderItem(dto.orderItems, order.id);
    await this.orderItemRepository.save(dto.orderItems);
    return order;
  }

  addValueToOrderItem(orderItems: CreateOrderItemDto[], products: Product[]): CreateOrderItemDto[] {
    return orderItems.map((elm) => {
      const product = products.find((el) => el.id === elm.productId);
      return { ...elm, totalValue: elm.quantity * product.price };
    });
  }

  calculateEstimation(shippingMethod: ShippingMethod): Date {
    const date = new Date();
    const deliveryTime = shippingMethod.fee === 0 ? 5 : 2;
    date.setDate(date.getDate() + deliveryTime);
    return date;
  }

  calculateTransactionValue(orderItems: CreateOrderItemDto[]): number {
    return orderItems.reduce((total: number, current: CreateOrderItemDto) => (total += current.totalValue), 0);
  }

  addOrderIdToOrderItem(orderItems: CreateOrderItemDto[], orderId: number): CreateOrderItemDto[] {
    return orderItems.map((el) => ({ ...el, orderId }));
  }
}
