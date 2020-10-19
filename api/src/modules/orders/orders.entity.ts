import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './orders-item/orders-item.entity';
import { User } from '../users/users.entity';
import { Discount } from '../discounts/discounts.entity';
import { Transaction } from '../transactions/transactions.entity';
import { Shipping } from '../shippings/shippings.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: null })
  discountId: number;

  @Column()
  transactionId: number;

  @Column()
  shippingId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;

  @ManyToOne((type) => Discount, (discount) => discount.orders, { eager: true })
  discount: Discount;

  @OneToOne((type) => Transaction, { eager: true, cascade: true })
  @JoinColumn()
  transaction: Transaction;

  @OneToOne((type) => Shipping, { eager: true, cascade: true })
  @JoinColumn()
  shipping: Shipping;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, { eager: true })
  orderItems: OrderItem[];
}
