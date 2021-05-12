import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';

import { BaseEntity } from './base.entity';

export abstract class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashedPassword: string;

  @Column({ default: false })
  isBlock: boolean;
}
