import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/orders.entity';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.discount)
  orders: Order[];
}
