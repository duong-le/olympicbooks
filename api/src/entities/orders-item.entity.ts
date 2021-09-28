import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  totalValue: number;

  @Column({ default: null })
  productTitle: string;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  product: Product;
}
