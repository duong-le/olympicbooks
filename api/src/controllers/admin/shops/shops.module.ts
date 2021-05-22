import { Module } from '@nestjs/common';

import { ShopsModule } from '../../store/shops/shops.module';
import { AdminShopsController } from './shops.controller';

@Module({
  controllers: [AdminShopsController],
  imports: [ShopsModule]
})
export class AdminShopsModule {}
