import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([CategoryRepository]), AuthModule],
  providers: [CategoriesService]
})
export class CategoriesModule {}
