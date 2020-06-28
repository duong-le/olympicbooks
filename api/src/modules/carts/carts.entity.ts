import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { CartItem } from './carts-item.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @OneToMany((type) => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
