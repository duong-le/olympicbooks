import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../../entities/orders.entity';
import { Product } from '../../entities/products.entity';
import { ShippingMethod } from '../../entities/shipping-methods.entity';
import { OrdersService } from '../../services/orders.service';
import { OrdersMineController } from './orders-mine.controller';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController, OrdersMineController],
  imports: [TypeOrmModule.forFeature([Order, Product, ShippingMethod])],
  providers: [OrdersService]
})
export class OrdersModule {}
