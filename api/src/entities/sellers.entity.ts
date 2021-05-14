import { Entity, JoinTable, ManyToMany } from 'typeorm';

import { Shop } from './shops.entity';
import { User } from './users.entity';

@Entity()
export class Seller extends User {
  @ManyToMany(() => Shop, (shop) => shop.sellers)
  @JoinTable({ name: 'sellers_shops' })
  shops: Shop[];
}
