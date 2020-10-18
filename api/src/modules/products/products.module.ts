import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductImage } from './product-images.entity';
import { Category } from '../categories/categories.entity';
import { Author } from '../authors/authors.entity';
import { Publisher } from '../publishers/publishers.entity';
import { CloudStorageService } from 'src/shared/Services/cloud-storage.service';
import { CategoriesService } from '../categories/categories.service';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category, Author, Publisher])],
  providers: [ProductsService, CategoriesService, CloudStorageService]
})
export class ProductsModule {}
