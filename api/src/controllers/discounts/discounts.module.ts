import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountsService } from '../../services/discounts.service';
import { DiscountsController } from './discounts.controller';
import { Discount } from './discounts.entity';

@Module({
  controllers: [DiscountsController],
  imports: [TypeOrmModule.forFeature([Discount])],
  providers: [DiscountsService]
})
export class DiscountsModule {}
