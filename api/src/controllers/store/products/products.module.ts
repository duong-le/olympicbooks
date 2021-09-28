import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from 'src/entities/attribute.entity';
import { CartItem } from 'src/entities/carts.entity';

import { OrderItem } from '../../../entities/orders-item.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { ProductsService } from '../../../services/products.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, OrderItem, CartItem, Attribute]),
    CategoriesModule
  ],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
