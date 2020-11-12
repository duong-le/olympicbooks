import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Shipping } from './shippings.entity';

@Entity()
export class ShippingMethod extends BaseEntity {
  @Column({ default: null })
  name: string;

  @Column()
  description: string;

  @Column()
  fee: number;

  @Column()
  disabled: boolean;

  @OneToMany(() => Shipping, (shipping) => shipping.shippingMethod)
  shippings: Shipping[];
}
