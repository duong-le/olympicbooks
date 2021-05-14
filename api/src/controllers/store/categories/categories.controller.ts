import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(public service: CategoriesService) {}

  @ApiOperation({ summary: 'Retrieve many Category' })
  @Get()
  getMany(): Promise<Category[]> {
    return this.service.getMany();
  }

  @ApiOperation({ summary: 'Retrieve one Category' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.service.getOne(id);
  }

  @ApiOperation({ summary: 'Retrieve many Publisher by Category' })
  @Get(':id/publishers')
  getPublishersByCategory(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.service.getPublishersByCategory(id);
  }

  @ApiOperation({ summary: 'Retrieve many Author by Category' })
  @Get(':id/authors')
  getAuthorsByCategory(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.service.getAuthorsByCategory(id);
  }
}
