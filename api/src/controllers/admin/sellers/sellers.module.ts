import { Module } from '@nestjs/common';

import { SellersModule } from '../../seller/sellers/sellers.module';
import { AdminSellersController } from './sellers.controller';

@Module({
  controllers: [AdminSellersController],
  imports: [SellersModule]
})
export class AdminSellersModule {}
