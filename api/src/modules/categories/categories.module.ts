import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService]
})
export class CategoriesModule {}
