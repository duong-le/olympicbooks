import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Discount } from './discounts.entity';
import { OrderItem } from './orders-item.entity';
import { Shipping } from './shippings.entity';
import { Transaction } from './transactions.entity';
import { User } from './users.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ default: null })
  buyerNote: string;

  @Column({ default: null })
  sellerNote: string;

  @Column()
  userId: number;

  @Column({ default: null })
  discountId: number;

  @Column()
  transactionId: number;

  @Column()
  shippingId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Discount, (discount) => discount.orders, { eager: true })
  discount: Discount;

  @OneToOne(() => Transaction, { eager: true, cascade: true })
  @JoinColumn()
  transaction: Transaction;

  @OneToOne(() => Shipping, { eager: true, cascade: true })
  @JoinColumn()
  shipping: Shipping;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true, cascade: ['insert', 'recover', 'remove', 'soft-remove'] })
  orderItems: OrderItem[];
}
