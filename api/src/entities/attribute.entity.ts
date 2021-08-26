import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { AttributeInputMode } from '../shared/Enums/attributes.enum';
import { AttributeValue } from './attribute-value.entity';
import { BaseEntity } from './base.entity';
import { Category } from './categories.entity';

@Entity()
export class Attribute extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true })
  mandatory: boolean;

  @Column({ enum: AttributeInputMode, default: AttributeInputMode.DEFAULT })
  inputMode: AttributeInputMode;

  @ManyToMany(() => Category, (category) => category.attributes)
  categories: Category[];

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute, { eager: true })
  attributeValues: AttributeValue[];
}
