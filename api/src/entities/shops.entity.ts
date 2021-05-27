import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { SellerShopStatus, ShopStatus } from '../shared/Enums/shops.enum';
import { BaseEntity } from './base.entity';
import { Order } from './orders.entity';
import { Product } from './products.entity';
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

  @Column({ enum: ShopStatus, default: ShopStatus.UNAPPROVED })
  status: SellerShopStatus | ShopStatus;

  @ManyToMany(() => Seller, (seller) => seller.shops)
  sellers: Seller[];

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  @OneToMany(() => Order, (order) => order.shop)
  orders: Order[];
}
