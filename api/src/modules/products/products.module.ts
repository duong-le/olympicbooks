import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
  providers: [ProductsService]
})
export class ProductsModule {}
