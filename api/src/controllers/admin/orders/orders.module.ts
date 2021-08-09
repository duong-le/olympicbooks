import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../../../entities/orders.entity';
import { OrdersModule } from '../../store/orders/orders.module';
import { AdminOrdersController } from './orders.controller';

@Module({
  controllers: [AdminOrdersController],
  imports: [TypeOrmModule.forFeature([Order]), OrdersModule]
})
export class AdminOrdersModule {}
