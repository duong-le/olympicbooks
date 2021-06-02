import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Attribute } from '../../../entities/attribute.entity';
import { Category } from '../../../entities/categories.entity';
import { CategoriesModule } from '../../store/categories/categories.module';
import { AdminCategoriesController } from './categories.controller';

@Module({
  controllers: [AdminCategoriesController],
  imports: [TypeOrmModule.forFeature([Category, Attribute, AttributeValue]), CategoriesModule]
})
export class AdminCategoriesModule {}
