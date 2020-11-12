import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudStorageService } from '../../core/Services/cloud-storage.service';
import { Author } from '../authors/authors.entity';
import { Category } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';
import { Publisher } from '../publishers/publishers.entity';
import { ProductImage } from './product-images.entity';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category, Author, Publisher])],
  providers: [ProductsService, CategoriesService, CloudStorageService]
})
export class ProductsModule {}
