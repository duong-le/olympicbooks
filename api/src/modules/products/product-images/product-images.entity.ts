import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products.entity';

@Entity()
export class ProductImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne((type) => Product, (product) => product.images)
  product: Product;
}
