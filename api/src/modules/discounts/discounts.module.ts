import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { DiscountRepository } from './discounts.repository';

@Module({
  controllers: [DiscountsController],
  imports: [TypeOrmModule.forFeature([DiscountRepository])],
  providers: [DiscountsService]
})
export class DiscountsModule {}
