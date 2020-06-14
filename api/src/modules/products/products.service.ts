import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {
    super(productRepository);
  }
}
