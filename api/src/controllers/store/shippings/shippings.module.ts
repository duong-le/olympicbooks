import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { Shipping } from '../../../entities/shippings.entity';
import { ShippingsService } from '../../../services/shippings.service';
import { ShippingsController } from './shippings.controller';

@Module({
  controllers: [ShippingsController],
  imports: [TypeOrmModule.forFeature([Shipping, ShippingMethod])],
  providers: [ShippingsService]
})
export class ShippingsModule {}
