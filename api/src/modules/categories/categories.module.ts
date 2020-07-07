import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { RolesGuard } from 'src/shared/Guards/roles.guard';

@Module({
  controllers: [CategoriesController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    CategoriesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class CategoriesModule {}
