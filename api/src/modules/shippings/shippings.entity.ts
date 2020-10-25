import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShippingMethod } from './shipping-methods.entity';
import { DeliveryState } from '../../shared/Enums/delivery-state.enum';

@Entity()
export class Shipping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ enum: DeliveryState, default: DeliveryState.PROCESSING })
  state: DeliveryState;

  @Column({ default: null })
  deliveryDate: Date;

  @Column()
  shippingMethodId: number;

  @ManyToOne(() => ShippingMethod, (shippingMethod) => shippingMethod.shippings)
  shippingMethod: ShippingMethod;
}
