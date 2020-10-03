import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './carts.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  controllers: [CartsController],
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartsService]
})
export class CartsModule {}
