import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../../../entities/categories.entity';
import { CategoriesModule } from '../../store/categories/categories.module';
import { AdminCategoriesController } from './categories.controller';

@Module({
  controllers: [AdminCategoriesController],
  imports: [TypeOrmModule.forFeature([Category]), CategoriesModule]
})
export class AdminCategoriesModule {}
