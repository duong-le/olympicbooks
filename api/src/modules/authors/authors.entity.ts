import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Product } from '../products/products.entity';

@Entity()
export class Author extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.authors)
  products: Product[];
}
