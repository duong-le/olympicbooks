import { AfterLoad, Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Product } from './products.entity';

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

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  key: number;

  isLeaf = false;

  expanded = true;

  @AfterLoad()
  setKey(): void {
    this.key = this.id;
  }
}
