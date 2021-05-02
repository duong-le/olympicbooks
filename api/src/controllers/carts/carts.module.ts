import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem } from '../../entities/carts.entity';
import { CartsService } from '../../services/carts.service';
import { CartsController } from './carts.controller';

@Module({
  controllers: [CartsController],
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartsService]
})
export class CartsModule {}
