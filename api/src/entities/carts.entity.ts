import { Column, Entity, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Customer } from './customers.entity';
import { Product } from './products.entity';
import { ShippingMethod } from './shipping-methods.entity';
import { TransactionMethod } from './transaction-methods.entity';

export class Cart {
  orderValue: number;
  shippingFee: number;
  quantity: number;
  items: CartItem[];
  transactionMethods: TransactionMethod[];
  shippingMethods: ShippingMethod[];
}

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
