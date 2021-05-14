import { Module } from '@nestjs/common';

import { CategoriesModule } from '../../store/categories/categories.module';
import { AdminCategoriesController } from './categories.controller';

@Module({
  controllers: [AdminCategoriesController],
  imports: [CategoriesModule]
})
export class AdminCategoriesModule {}
