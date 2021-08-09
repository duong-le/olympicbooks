import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttributeValue } from '../../../entities/attribute-value.entity';
import { CartItem } from '../../../entities/carts.entity';
import { Category } from '../../../entities/categories.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { ProductsModule } from '../../store/products/products.module';
import { AdminProductsController } from './products.controller';

@Module({
  controllers: [AdminProductsController],
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Category, CartItem, AttributeValue]),
    ProductsModule
  ]
})
export class AdminProductsModule {}
