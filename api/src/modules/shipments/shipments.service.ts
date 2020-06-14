import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipment } from './shipments.entity';
import { ShipmentRepository } from './shipments.repository';

@Injectable()
export class ShipmentsService extends TypeOrmCrudService<Shipment> {
  constructor(@InjectRepository(ShipmentRepository) private shipmentRepository: ShipmentRepository) {
    super(shipmentRepository);
  }
}
