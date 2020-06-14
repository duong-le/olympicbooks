import { Repository, EntityRepository } from 'typeorm';
import { Discount } from './discounts.entity';

@EntityRepository(Discount)
export class DiscountRepository extends Repository<Discount> {}
