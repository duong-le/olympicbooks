import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ProductImage } from './product-images.entity';

@Injectable()
export class ProductImagesService extends TypeOrmCrudService<ProductImage> {
  constructor(@InjectRepository(ProductImage) productImageRepository: Repository<ProductImage>) {
    super(productImageRepository);
  }
}
