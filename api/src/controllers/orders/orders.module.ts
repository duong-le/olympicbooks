import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from '../../services/orders.service';
import { Product } from '../products/products.entity';
import { ShippingMethod } from '../shippings/shipping-methods.entity';
import { OrdersMineController } from './orders-mine.controller';
import { OrdersController } from './orders.controller';
import { Order } from './orders.entity';

@Module({
  controllers: [OrdersController, OrdersMineController],
  imports: [TypeOrmModule.forFeature([Order, Product, ShippingMethod])],
  providers: [OrdersService]
})
export class OrdersModule {}
