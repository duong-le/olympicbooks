import { Module } from '@nestjs/common';

import { ProductsModule } from '../../store/products/products.module';
import { AdminProductsController } from './products.controller';

@Module({
  controllers: [AdminProductsController],
  imports: [ProductsModule]
})
export class AdminProductsModule {}
