import { Repository, EntityRepository } from 'typeorm';
import { Category } from './categories.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
