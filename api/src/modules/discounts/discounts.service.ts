import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './discounts.entity';
import { DiscountRepository } from './discounts.repository';

@Injectable()
export class DiscountsService extends TypeOrmCrudService<Discount> {
  constructor(@InjectRepository(DiscountRepository) private discountRepository: DiscountRepository) {
    super(discountRepository);
  }
}
