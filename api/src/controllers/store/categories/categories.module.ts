import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { CloudStorageService } from '../../../services/cloud-storage.service';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category, AttributeValue])],
  providers: [CategoriesService, CloudStorageService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
