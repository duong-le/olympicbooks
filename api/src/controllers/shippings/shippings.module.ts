import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShippingsService } from '../../services/shippings.service';
import { ShippingMethod } from './shipping-methods.entity';
import { ShippingsController } from './shippings.controller';
import { Shipping } from './shippings.entity';

@Module({
  controllers: [ShippingsController],
  imports: [TypeOrmModule.forFeature([Shipping, ShippingMethod])],
  providers: [ShippingsService]
})
export class ShippingsModule {}
