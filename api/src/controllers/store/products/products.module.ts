import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Author } from '../../../entities/authors.entity';
import { CartItem } from '../../../entities/carts.entity';
import { Category } from '../../../entities/categories.entity';
import { OrderItem } from '../../../entities/orders-item.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { Publisher } from '../../../entities/publishers.entity';
import { CloudStorageService } from '../../../services/cloud-storage.service';
import { ProductsService } from '../../../services/products.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Category, Author, Publisher, OrderItem, CartItem]),
    CategoriesModule
  ],
  providers: [ProductsService, CloudStorageService],
  exports: [ProductsService]
})
export class ProductsModule {}
