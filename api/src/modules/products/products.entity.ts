import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Author } from '../authors/authors.entity';
import { Publisher } from '../publishers/publishers.entity';
import { Category } from '../categories/categories.entity';
import { OrderItem } from '../orders/orders-item/orders-item.entity';
import { ProductImage } from './product-images.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publicationYear: number;

  @Column()
  pages: number;

  @Column()
  price: number;

  @Column()
  originalPrice: number;

  @Column()
  description: string;

  @Column({ default: true })
  inStock: boolean;

  @Column()
  categoryId: number;

  @Column()
  publisherId: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, { eager: true, cascade: true })
  images: ProductImage[];

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToOne(() => Publisher, (publisher) => publisher.products, { eager: true })
  publisher: Publisher;

  @ManyToMany(() => Author, (author) => author.products, { eager: true })
  @JoinTable({ name: 'products_authors' })
  authors: Author[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
