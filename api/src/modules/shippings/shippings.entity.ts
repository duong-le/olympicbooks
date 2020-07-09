import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShippingMethod } from './shipping-methods.entity';

@Entity()
export class Shipping extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  estimation: Date;

  @Column()
  shippingMethodId: number;

  @ManyToOne((type) => ShippingMethod, (shippingMethod) => shippingMethod.shippings)
  shippingMethod: ShippingMethod;
}
