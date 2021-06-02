import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { ProductStatus, SellerProductStatus } from '../shared/Enums/products.enum';
import { AttributeValue } from './attribute-value.entity';
import { Author } from './authors.entity';
import { BaseEntity } from './base.entity';
import { Category } from './categories.entity';
import { OrderItem } from './orders-item.entity';
import { ProductImage } from './product-images.entity';
import { Publisher } from './publishers.entity';
import { Shop } from './shops.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publicationYear: number;

  @Column()
  pages: number;

  @Column()
  weight: number;

  @Column()
  price: number;

  @Column()
  originalPrice: number;

  @Column({ enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: SellerProductStatus | ProductStatus;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, { eager: true, cascade: true })
  images: ProductImage[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @Column()
  categoryId: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.products, { eager: true })
  publisher: Publisher;

  @Column()
  publisherId: number;

  @ManyToMany(() => Author, (author) => author.products, { eager: true })
  @JoinTable({ name: 'products_authors' })
  authors: Author[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToOne(() => Shop, (shop) => shop.products, { eager: true })
  shop: Shop;

  @Column()
  shopId: number;

  @ManyToMany(() => AttributeValue, (attributeValue) => attributeValue.products)
  @JoinTable({ name: 'product_attribute' })
  attributeValues: AttributeValue[];
}
