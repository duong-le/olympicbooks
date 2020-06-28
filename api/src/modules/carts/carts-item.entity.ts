import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from './carts.entity';
import { Product } from '../products/products.entity';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @ManyToOne((type) => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @OneToOne((type) => Product)
  @JoinColumn()
  product: Product;
}
