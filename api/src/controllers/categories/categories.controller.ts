import { Controller, UseGuards, Get, Post, Patch, Param, ParseIntPipe, Body, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../core/Decorators/roles.decorator';
import { CategoriesService } from '../../services/categories.service';
import { UploadOptions } from '../../services/cloud-storage.service';
import { Role } from '../../shared/Enums/roles.enum';
import { File } from '../../shared/Interfaces/file.interface';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Category } from './categories.entity';

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
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create one Category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async createOne(@Body() dto: CreateCategoryDto, @UploadedFile() uploadedFile: File): Promise<Category> {
    return this.service.createOne(dto, uploadedFile);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update one Category' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto, @UploadedFile() uploadedFile: File): Promise<Category> {
    return this.service.updateOne(id, dto, uploadedFile);
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
  getPublishersByCategory(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.service.getPublishersByCategory(id);
  }

  @Get(':id/authors')
  @ApiOperation({ summary: 'Retrieve many Author by Category' })
  getAuthorsByCategory(@Param('id', ParseIntPipe) id: number): Promise<Category[]> {
    return this.service.getAuthorsByCategory(id);
  }
}
