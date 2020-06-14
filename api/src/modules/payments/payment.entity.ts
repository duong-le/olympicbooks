import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

export enum PaymentMethod {
  COD = 'COD'
}

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ unique: true, enum: PaymentMethod })
  method: string;

  @OneToMany((type) => Order, (order) => order.payment)
  orders: Order;
}
