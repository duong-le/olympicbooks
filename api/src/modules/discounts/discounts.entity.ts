import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Order } from '../orders/orders.entity';

@Entity()
export class Discount extends BaseEntity {
  @Column()
  description: string;

  @Column({ unique: true })
  voucherCode: string;

  @Column()
  discountValue: number;

  @Column({ default: 0 })
  minOrderValue: number;

  @Column()
  validFrom: Date;

  @Column()
  validUntil: Date;

  @OneToMany(() => Order, (order) => order.discount)
  orders: Order[];
}
