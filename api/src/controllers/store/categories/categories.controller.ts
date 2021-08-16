import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { SlugService } from '../../../core/Utils/slug.service';
import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    public service: CategoriesService,
    public slugService: SlugService,
    @InjectRepository(Category) public categoryRepository: TreeRepository<Category>
  ) {}

  @ApiOperation({ summary: 'Retrieve many Category' })
  @Get()
  async getMany(): Promise<Category[]> {
    const categories = await this.categoryRepository.findTrees();
    return this.service.setLeaf(categories);
  }

  @ApiOperation({ summary: 'Retrieve one Category' })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return this.service.getCategoryAncestorsAndDescendants(category);
  }
}
