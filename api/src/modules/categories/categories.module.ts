import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { RolesGuard } from 'src/shared/Guards/roles.guard';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [
    CategoriesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class CategoriesModule {}
