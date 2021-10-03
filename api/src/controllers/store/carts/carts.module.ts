import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem } from '../../../entities/carts.entity';
import { Product } from '../../../entities/products.entity';
import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { TransactionMethod } from '../../../entities/transaction-methods.entity';
import { CartsService } from '../../../services/carts.service';
import { ShippingsModule } from '../shippings/shippings.module';
import { CartsController } from './carts.controller';

@Module({
  controllers: [CartsController],
  imports: [
    TypeOrmModule.forFeature([CartItem, Product, ShippingMethod, TransactionMethod]),
    ShippingsModule
  ],
  providers: [CartsService],
  exports: [CartsService]
})
export class CartsModule {}
