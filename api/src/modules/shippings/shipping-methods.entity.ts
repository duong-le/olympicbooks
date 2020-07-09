import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shipping } from './shippings.entity';

@Entity()
export class ShippingMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  description: string;

  @Column()
  fee: number;

  @Column()
  disabled: boolean;

  @OneToMany((type) => Shipping, (shipping) => shipping.shippingMethod)
  shippings: Shipping[];
}
