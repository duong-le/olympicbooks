import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderRepository } from './orders.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrderRepository]), AuthModule],
  providers: [OrdersService]
})
export class OrdersModule {}
