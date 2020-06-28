import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './orders-item.entity';
import { User } from '../users/users.entity';
import { Discount } from '../discounts/discounts.entity';
import { Payment } from '../payments/payments.entity';
import { Shipment } from '../shipments/shipments.entity';

export enum OrderState {
  PROCESSING = 'PROCESSING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED'
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: OrderState, default: OrderState.PROCESSING })
  state: OrderState;

  @Column()
  totalPrice: number;

  @Column()
  userId: number;

  @Column()
  discountId: number;

  @Column()
  paymentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;

  @ManyToOne((type) => Discount, (discount) => discount.orders)
  discount: Discount;

  @ManyToOne((type) => Payment, (payment) => payment.orders)
  payment: Payment;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToOne((type) => Shipment)
  @JoinColumn()
  shipment: Shipment;
}
