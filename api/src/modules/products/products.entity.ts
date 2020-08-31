import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Author } from '../authors/authors.entity';
import { Publisher } from '../publishers/publishers.entity';
import { Category } from '../categories/categories.entity';
import { OrderItem } from '../orders/orders-item/orders-item.entity';
import { ProductImage } from './product-images/product-images.entity';

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

  @Column({ default: true })
  stock: boolean;

  @Column()
  description: string;

  @Column()
  categoryId: number;

  @Column()
  publisherId: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => ProductImage, (productImage) => productImage.product, { eager: true, cascade: true })
  images: ProductImage[];

  @ManyToOne((type) => Category, (category) => category.products, { eager: true })
  category: Category;

  @ManyToOne((type) => Publisher, (publisher) => publisher.products, { eager: true })
  publisher: Publisher;

  @ManyToMany((type) => Author, (author) => author.products, { eager: true, cascade: true })
  @JoinTable({ name: 'products_authors' })
  authors: Author[];

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
