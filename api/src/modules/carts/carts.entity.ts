import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Entity()
@Unique(['userId', 'productId'])
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.cartItems)
  user: User;

  @ManyToOne((type) => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;
}
