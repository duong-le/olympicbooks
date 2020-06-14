import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { User } from '../users/user.entity';
import { Discount } from '../discounts/discount.entity';
import { Payment } from '../payments/payment.entity';
import { Shipment } from '../shipments/shipment.entity';

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

  @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToOne((type) => Shipment)
  @JoinColumn()
  shipment: Shipment;
}
