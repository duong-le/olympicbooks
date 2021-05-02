import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { Discount } from '../controllers/discounts/discounts.entity';

@Injectable()
export class DiscountsService extends TypeOrmCrudService<Discount> {
  constructor(@InjectRepository(Discount) private discountRepository: Repository<Discount>) {
    super(discountRepository);
  }
}
