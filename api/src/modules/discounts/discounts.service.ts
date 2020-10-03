import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Discount } from './discounts.entity';

@Injectable()
export class DiscountsService extends TypeOrmCrudService<Discount> {
  constructor(@InjectRepository(Discount) private discountRepository: Repository<Discount>) {
    super(discountRepository);
  }
}
