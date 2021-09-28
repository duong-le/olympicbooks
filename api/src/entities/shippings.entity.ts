import { Column, Entity, ManyToOne } from 'typeorm';

import { ShippingState } from '../shared/Enums/shippings.enum';
import { BaseEntity } from './base.entity';
import { ShippingMethod } from './shipping-methods.entity';

@Entity()
export class Shipping extends BaseEntity {
  @Column({ default: null })
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ enum: ShippingState, default: ShippingState.PROCESSING })
  state: ShippingState;

  @Column({ default: null })
  code: string;

  @Column({ default: 0 })
  fee: number;

  @Column({ default: null })
  deliveryDate: Date;

  @Column()
  shippingMethodId: number;

  @ManyToOne(() => ShippingMethod, (shippingMethod) => shippingMethod.shippings)
  shippingMethod: ShippingMethod;
}
