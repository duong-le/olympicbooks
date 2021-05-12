import { Column, Entity } from 'typeorm';

import { User } from './users.entity';

@Entity()
export class Seller extends User {
  @Column({ default: false })
  isApproved: boolean;
}
