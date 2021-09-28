import { Column, Entity, OneToMany } from 'typeorm';

import { CartItem } from './carts.entity';
import { Order } from './orders.entity';
import { User } from './users.entity';

@Entity()
export class Customer extends User {
  @Column({ default: null })
  address: string;

  @Column({ default: null })
  phoneNumber: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.customer, { cascade: true })
  cartItems: CartItem[];
}
