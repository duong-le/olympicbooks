import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from '../../services/categories.service';
import { CloudStorageService } from '../../services/cloud-storage.service';
import { CategoriesController } from './categories.controller';
import { Category } from './categories.entity';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CloudStorageService]
})
export class CategoriesModule {}
