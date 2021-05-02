import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from '../../services/categories.service';
import { CloudStorageService } from '../../services/cloud-storage.service';
import { ProductsService } from '../../services/products.service';
import { Author } from '../authors/authors.entity';
import { CartItem } from '../carts/carts.entity';
import { Category } from '../categories/categories.entity';
import { OrderItem } from '../orders/orders-item/orders-item.entity';
import { Publisher } from '../publishers/publishers.entity';
import { ProductImage } from './product-images.entity';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category, Author, Publisher, OrderItem, CartItem])],
  providers: [ProductsService, CategoriesService, CloudStorageService]
})
export class ProductsModule {}
