import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Product } from '../products/products.entity';

@Entity()
export class Publisher extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.publisher)
  products: Product[];
}
