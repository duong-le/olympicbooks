import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './carts.repository';

@Module({
  controllers: [CartsController],
  imports: [TypeOrmModule.forFeature([CartRepository])],
  providers: [CartsService]
})
export class CartsModule {}
