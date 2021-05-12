import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Seller } from '../../../entities/sellers.entity';
import { SellersService } from '../../../services/sellers.service';
import { SellersController } from './sellers.controller';

@Module({
  controllers: [SellersController],
  imports: [TypeOrmModule.forFeature([Seller])],
  providers: [SellersService]
})
export class SellersModule {}
