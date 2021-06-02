import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

import { AttributeInputMode } from '../shared/Enums/attributes.enum';
import { AttributeValue } from './attribute-value.entity';
import { BaseEntity } from './base.entity';
import { Category } from './categories.entity';

@Entity()
@Unique(['name', 'categoryId'])
export class Attribute extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true })
  isRequired: boolean;

  @Column({ enum: AttributeInputMode, default: AttributeInputMode.DEFAULT })
  inputMode: AttributeInputMode;

  @ManyToOne(() => Category, (category) => category.attributes)
  category: Category;

  @Column()
  categoryId: number;

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  attributeValues: AttributeValue[];
}
