import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Tree, TreeParent, TreeChildren, AfterLoad } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
@Tree('materialized-path')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  img: string;

  @TreeParent()
  parent: Category;

  @TreeChildren({ cascade: true })
  children: Category[];

  @Column({ default: null })
  key: number;

  @Column({ default: false })
  isLeaf: boolean;

  @Column({ default: true })
  expanded: boolean;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];

  @AfterLoad()
  setKey(): void {
    this.key = this.id;
  }
}
