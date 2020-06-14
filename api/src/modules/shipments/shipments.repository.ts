import { Repository, EntityRepository } from 'typeorm';
import { Shipment } from './shipments.entity';

@EntityRepository(Shipment)
export class ShipmentRepository extends Repository<Shipment> {}
