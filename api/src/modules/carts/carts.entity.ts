import { Column, Entity, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Entity()
@Unique(['userId', 'productId'])
export class CartItem extends BaseEntity {
  @Column()
  userId: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @ManyToOne(() => User, (user) => user.cartItems)
  user: User;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;
}
