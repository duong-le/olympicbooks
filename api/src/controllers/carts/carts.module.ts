import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartsService } from '../../services/carts.service';
import { CartsController } from './carts.controller';
import { CartItem } from './carts.entity';

@Module({
  controllers: [CartsController],
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartsService]
})
export class CartsModule {}
