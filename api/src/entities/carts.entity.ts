import { Column, Entity, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Customer } from './customers.entity';
import { Product } from './products.entity';

@Entity()
@Unique(['customerId', 'productId'])
export class CartItem extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => Customer, (customer) => customer.cartItems)
  customer: Customer;

  @Column()
  customerId: number;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;

  @Column()
  productId: number;
}
