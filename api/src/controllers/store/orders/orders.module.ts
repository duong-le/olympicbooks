import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem } from '../../../entities/carts.entity';
import { OrderItem } from '../../../entities/orders-item.entity';
import { Order } from '../../../entities/orders.entity';
import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { TransactionMethod } from '../../../entities/transaction-methods.entity';
import { OrdersService } from '../../../services/orders.service';
import { ShippingsModule } from '../shippings/shippings.module';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController, OrdersController],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, ShippingMethod, TransactionMethod, CartItem]),
    ShippingsModule
  ],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
