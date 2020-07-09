import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderItem } from './orders-item/orders-item.entity';
import { Product } from '../products/products.entity';
import { ShippingMethod } from '../shippings/shipping-methods.entity';
import { OrdersMineController } from './orders-mine.controller';

@Module({
  controllers: [OrdersController, OrdersMineController],
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, ShippingMethod])],
  providers: [OrdersService]
})
export class OrdersModule {}
