import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Seller } from './sellers.entity';

@Entity()
export class Shop extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: null })
  coverImgName: string;

  @Column({ default: null })
  coverImgUrl: string;

  @Column({ default: false })
  isApproved: boolean;

  @ManyToMany(() => Seller, (seller) => seller.shops)
  sellers: Seller[];
}
