import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { UploadOptions } from '../../../services/cloud-storage.service';
import { File } from '../../../shared/Interfaces/file.interface';
import { CreateCategoryDto, UpdateCategoryDto } from '../../admin/categories/categories.dto';
import { CategoriesController } from '../../store/categories/categories.controller';

@ApiTags('Admin Categories')
@ApiBearerAuth()
@Controller('admin/categories')
@UseGuards(AuthGuard())
export class AdminCategoriesController extends CategoriesController {
  constructor(
    public service: CategoriesService,
    @InjectRepository(Category) public categoryRepository: TreeRepository<Category>
  ) {
    super(service, categoryRepository);
  }

  @ApiOperation({ summary: 'Create one Category' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async createOne(@Body() dto: CreateCategoryDto, @UploadedFile() uploadedFile: File): Promise<Category> {
    let parent: Category;
    let category: Category;
    const { parentId, ...others } = dto;

    if (uploadedFile) {
      const file = await this.service.uploadFile(uploadedFile);
      category = this.categoryRepository.create({ ...others, imgUrl: file.publicUrl, imgName: file.name });
    } else category = this.categoryRepository.create(others);

    if (parentId) {
      parent = await this.categoryRepository.findOne(parentId);
      if (!parent) throw new NotFoundException('Parent category not found!');
      category.parent = parent;
    }
    return await this.categoryRepository.save(category);
  }

  @ApiOperation({ summary: 'Update one Category' })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() uploadedFile: File
  ): Promise<Category> {
    const category = await this.getOne(id);
    if (dto?.title) category.title = dto.title;

    if (uploadedFile) {
      // if (category.imgName) await this.service.removeFile(category.imgName);
      const file = await this.service.uploadFile(uploadedFile);
      category.imgUrl = file.publicUrl;
      category.imgName = file.name;
    }
    // if (dto?.parentId) {
    //   const parent = await this.getOne(dto.parentId);
    //   category.parent = parent;
    // }
    return await this.categoryRepository.save(category);
  }

  @ApiOperation({ summary: 'Delete one Category' })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id, { relations: ['products'] });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    await this.categoryRepository.softDelete(id);
    // if (category.imgUrl && category.imgName) await this.service.removeFile(category.imgName);
  }
}
