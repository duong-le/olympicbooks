import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from '../../../entities/shops.entity';
import { ShopsModule } from '../../store/shops/shops.module';
import { SellerShopsController } from './shops.controller';

@Module({
  controllers: [SellerShopsController],
  imports: [TypeOrmModule.forFeature([Shop]), ShopsModule]
})
export class SellerShopsModule {}
