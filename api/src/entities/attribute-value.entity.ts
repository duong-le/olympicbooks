import { Column, Entity, ManyToMany, ManyToOne, Unique } from 'typeorm';

import { Attribute } from './attribute.entity';
import { BaseEntity } from './base.entity';
import { Product } from './products.entity';

@Entity()
@Unique(['name', 'attributeId'])
export class AttributeValue extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Attribute, (attribute) => attribute.attributeValues)
  attribute: Attribute;

  @Column()
  attributeId: number;

  @ManyToMany(() => Product, (product) => product.attributeValues)
  products: Product[];
}
