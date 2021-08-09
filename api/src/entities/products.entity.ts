import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { ProductStatus } from '../shared/Enums/products.enum';
import { AttributeValue } from './attribute-value.entity';
import { BaseEntity } from './base.entity';
import { Category } from './categories.entity';
import { OrderItem } from './orders-item.entity';
import { ProductImage } from './product-images.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  originalPrice: number;

  @Column({ enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, { eager: true, cascade: true })
  images: ProductImage[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @Column()
  categoryId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToMany(() => AttributeValue, (attributeValue) => attributeValue.products)
  @JoinTable({ name: 'product_attribute' })
  attributeValues: AttributeValue[];
}
