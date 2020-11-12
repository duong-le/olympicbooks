import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../core/Entities/base.entity';
import { Role } from '../../shared/Enums/roles.enum';
import { CartItem } from '../carts/carts.entity';
import { Order } from '../orders/orders.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashedPassword: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  phoneNumber: string;

  @Column({ default: false })
  isBlock: boolean;

  @Column({ enum: Role, default: Role.CUSTOMER })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user, { eager: true, cascade: true })
  cartItems: CartItem[];
}
