import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {
    super(productRepository);
  }
}
