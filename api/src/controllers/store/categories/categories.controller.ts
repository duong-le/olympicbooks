import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(public service: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve many Category' })
  getMany(): Promise<Category[]> {
    return this.service.getMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve one Category' })
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.service.getOne(id);
  }

  @Get(':id/publishers')
  @ApiOperation({ summary: 'Retrieve many Publisher by Category' })
  getPublishersByCategory(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.service.getPublishersByCategory(id);
  }

  @Get(':id/authors')
  @ApiOperation({ summary: 'Retrieve many Author by Category' })
  getAuthorsByCategory(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.service.getAuthorsByCategory(id);
  }
}
