import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Customer } from './customers.entity';
import { Discount } from './discounts.entity';
import { OrderItem } from './orders-item.entity';
import { Shipping } from './shippings.entity';
import { Shop } from './shops.entity';
import { Transaction } from './transactions.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ default: null })
  buyerNote: string;

  @Column({ default: null })
  sellerNote: string;

  @ManyToOne(() => Discount, (discount) => discount.orders, { eager: true })
  discount: Discount;

  @Column({ default: null })
  discountId: number;

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

  @ManyToOne(() => Shop, (shop) => shop.orders)
  shop: Shop;

  @Column()
  shopId: number;
}
