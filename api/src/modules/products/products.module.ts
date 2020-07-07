import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductImage } from './product-images/product-images.entity';
import { ProductImagesController } from './product-images/product-images.controller';
import { ProductImagesService } from './product-images/product-images.service';

@Module({
  controllers: [ProductsController, ProductImagesController],
  imports: [TypeOrmModule.forFeature([Product, ProductImage])],
  providers: [ProductsService, ProductImagesService]
})
export class ProductsModule {}
