import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { CloudStorageService } from '../../../services/cloud-storage.service';
import { AdminCategoriesController } from './categories.controller';

@Module({
  controllers: [AdminCategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CloudStorageService]
})
export class AdminCategoriesModule {}
