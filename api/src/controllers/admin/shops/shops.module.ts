import { Module } from '@nestjs/common';
import { ShopsModule } from 'src/controllers/seller/shops/shops.module';

import { AdminShopsController } from './shops.controller';

@Module({
  controllers: [AdminShopsController],
  imports: [ShopsModule]
})
export class AdminShopsModule {}
