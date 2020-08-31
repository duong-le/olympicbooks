import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category> {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
    super(categoryRepository);
  }

  async getPublishersByCategory(id: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.products', 'products')
      .innerJoinAndSelect('products.publisher', 'publisher')
      .where('category.id = :id', { id })
      .select('publisher.name AS name')
      .addSelect('COUNT(*) AS count')
      .groupBy('publisher.name')
      .getRawMany();
  }

  async getAuthorsByCategory(id: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.products', 'products')
      .innerJoinAndSelect('products.authors', 'authors')
      .where('category.id = :id', { id })
      .select('authors.name AS name')
      .addSelect('COUNT(*) AS count')
      .groupBy('authors.name')
      .getRawMany();
  }
}
