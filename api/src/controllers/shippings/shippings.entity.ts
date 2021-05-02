import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../core/Entities/base.entity';
import { DeliveryState } from '../../shared/Enums/delivery-state.enum';
import { ShippingMethod } from './shipping-methods.entity';

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
