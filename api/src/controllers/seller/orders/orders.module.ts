import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../../../entities/orders.entity';
import { OrdersModule } from '../../store/orders/orders.module';
import { ShopOrdersController } from './orders.controller';

@Module({
  controllers: [ShopOrdersController],
  imports: [TypeOrmModule.forFeature([Order]), OrdersModule]
})
export class ShopOrdersModule {}
