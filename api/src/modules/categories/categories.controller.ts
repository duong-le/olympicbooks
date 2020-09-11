import { Controller, UseGuards, Get, Post, Patch, Param, ParseIntPipe, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

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

  @Post()
  @ApiOperation({ summary: 'Create one Category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  createOne(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.service.createOne(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one Category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.service.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one Category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteOne(id);
  }

  @Get(':id/publishers')
  @ApiOperation({ summary: 'Retrieve many Publisher by Category' })
  getPublishersByCategory(@Param('id') id: number): Promise<Category[]> {
    return this.service.getPublishersByCategory(id);
  }

  @Get(':id/authors')
  @ApiOperation({ summary: 'Retrieve many Author by Category' })
  getAuthorsByCategory(@Param('id') id: number): Promise<Category[]> {
    return this.service.getAuthorsByCategory(id);
  }
}
