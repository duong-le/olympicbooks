import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';

import { Attribute } from './attribute.entity';
import { BaseEntity } from './base.entity';
import { Product } from './products.entity';

@Entity()
@Tree('closure-table', {
  ancestorColumnName: (column) => 'ancestor_category_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_category_' + column.propertyName
})
export class Category extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true, default: null })
  slug: string;

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

  @ManyToMany(() => Attribute, (attribute) => attribute.categories, { eager: true })
  @JoinTable({ name: 'category_attribute' })
  attributes: Attribute[];

  parents: Category[];

  key: number;

  isLeaf = false;

  expanded = true;

  @AfterLoad()
  setKey(): void {
    this.key = this.id;
  }
}
