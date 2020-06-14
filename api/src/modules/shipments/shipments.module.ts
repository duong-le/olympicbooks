import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { ShipmentRepository } from './shipments.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ShipmentsController],
  imports: [TypeOrmModule.forFeature([ShipmentRepository]), AuthModule],
  providers: [ShipmentsService]
})
export class ShipmentsModule {}
