import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoriesService]
})
export class CategoriesModule {}
