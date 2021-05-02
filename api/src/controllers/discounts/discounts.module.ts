import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discounts.entity';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';

@Module({
  controllers: [DiscountsController],
  imports: [TypeOrmModule.forFeature([Discount])],
  providers: [DiscountsService]
})
export class DiscountsModule {}
