import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ShipmentMethod {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS'
}

@Entity()
export class Shipment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ enum: ShipmentMethod, default: ShipmentMethod.STANDARD })
  method: ShipmentMethod;

  @Column()
  fee: number;
}
