import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category> {
  constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }
}
