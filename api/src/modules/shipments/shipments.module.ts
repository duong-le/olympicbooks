import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { ShipmentRepository } from './shipments.repository';

@Module({
  controllers: [ShipmentsController],
  imports: [TypeOrmModule.forFeature([ShipmentRepository])],
  providers: [ShipmentsService]
})
export class ShipmentsModule {}
