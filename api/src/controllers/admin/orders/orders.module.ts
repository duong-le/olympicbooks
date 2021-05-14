import { Module } from '@nestjs/common';

import { OrdersModule } from '../../store/orders/orders.module';
import { AdminOrdersController } from './orders.controller';

@Module({
  controllers: [AdminOrdersController],
  imports: [OrdersModule]
})
export class AdminOrdersModule {}
