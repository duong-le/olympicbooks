import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Customer } from './customers.entity';
import { OrderItem } from './orders-item.entity';
import { Shipping } from './shippings.entity';
import { Transaction } from './transactions.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ default: null })
  buyerNote: string;

  @Column({ default: null })
  sellerNote: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Column()
  customerId: number;

  @OneToOne(() => Transaction, { eager: true, cascade: true })
  @JoinColumn()
  transaction: Transaction;

  @Column()
  transactionId: number;

  @OneToOne(() => Shipping, { eager: true, cascade: true })
  @JoinColumn()
  shipping: Shipping;

  @Column()
  shippingId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
    cascade: ['insert', 'recover', 'remove', 'soft-remove']
  })
  orderItems: OrderItem[];

  expanded = false;
}
