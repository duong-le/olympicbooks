import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Discount } from '../../entities/discounts.entity';
import { DiscountsService } from '../../services/discounts.service';
import { DiscountsController } from './discounts.controller';

@Module({
  controllers: [DiscountsController],
  imports: [TypeOrmModule.forFeature([Discount])],
  providers: [DiscountsService]
})
export class DiscountsModule {}
