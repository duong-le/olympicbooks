import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [ProductsService]
})
export class ProductsModule {}
