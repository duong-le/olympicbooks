import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ShippingMethod } from './shipping-methods.entity';

export enum DeliveryState {
  PROCESSING = 'PROCESSING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

@Entity()
export class Shipping extends BaseEntity {
  @Column({ default: null })
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ enum: DeliveryState, default: DeliveryState.PROCESSING })
  state: DeliveryState;

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
