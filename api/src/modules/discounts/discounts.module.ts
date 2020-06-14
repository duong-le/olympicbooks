import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { DiscountRepository } from './discounts.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DiscountsController],
  imports: [TypeOrmModule.forFeature([DiscountRepository]), AuthModule],
  providers: [DiscountsService]
})
export class DiscountsModule {}
