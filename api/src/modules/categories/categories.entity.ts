import { AfterLoad, Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

import { BaseEntity } from '../../core/Entities/base.entity';
import { Product } from '../products/products.entity';

@Entity()
@Tree('materialized-path')
export class Category extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  imgName: string;

  @TreeParent()
  parent: Category;

  @TreeChildren({ cascade: true })
  children: Category[];

  @Column({ default: null })
  key: number;

  isLeaf: boolean;

  @Column({ default: true })
  expanded: boolean;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @AfterLoad()
  setKey(): void {
    this.key = this.id;
  }
}
