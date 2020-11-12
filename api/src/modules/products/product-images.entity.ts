import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Product } from './products.entity';

@Entity()
export class ProductImage extends BaseEntity {
  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  imgName: string;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product;
}
