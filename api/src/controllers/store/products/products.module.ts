import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/carts.entity';

import { OrderItem } from '../../../entities/orders-item.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { CloudStorageService } from '../../../services/cloud-storage.service';
import { ProductsService } from '../../../services/products.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product, ProductImage, OrderItem, CartItem]), CategoriesModule],
  providers: [ProductsService, CloudStorageService],
  exports: [ProductsService]
})
export class ProductsModule {}
