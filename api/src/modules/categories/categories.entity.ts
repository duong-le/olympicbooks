import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  img: string;

  @Column({ default: null })
  parent: number;

  @OneToMany((type) => Product, (product) => product.publisher)
  products: Product[];
}
