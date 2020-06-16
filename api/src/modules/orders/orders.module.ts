import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repository';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  providers: [OrdersService]
})
export class OrdersModule {}
