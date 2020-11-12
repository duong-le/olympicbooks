import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../core/Entities/base.entity';
import { Product } from '../../products/products.entity';
import { Order } from '../orders.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  totalValue: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, { eager: true })
  product: Product;
}
