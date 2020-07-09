import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './shippings.entity';
import { ShippingsController } from './shippings.controller';
import { ShippingsService } from './shippings.service';
import { ShippingMethod } from './shipping-methods.entity';

@Module({
  controllers: [ShippingsController],
  imports: [TypeOrmModule.forFeature([Shipping, ShippingMethod])],
  providers: [ShippingsService]
})
export class ShippingsModule {}
