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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { UploadOptions } from '../../../core/Utils/cloud-storage.service';
import { SlugService } from '../../../core/Utils/slug.service';
import { Attribute } from '../../../entities/attribute.entity';
import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { UserType } from '../../../shared/Enums/users.enum';
import { File } from '../../../shared/Interfaces/file.interface';
import { CategoriesController } from '../../store/categories/categories.controller';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@ApiTags('Admin Categories')
@ApiBearerAuth()
@Controller('admin/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
export class AdminCategoriesController extends CategoriesController {
  constructor(
    public service: CategoriesService,
    public slugService: SlugService,
    @InjectRepository(Category) public categoryRepository: TreeRepository<Category>,
    @InjectRepository(Attribute) public attributeRepository: TreeRepository<Attribute>
  ) {
    super(service, slugService, categoryRepository);
  }

  @ApiOperation({ summary: 'Create one Category' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async createOne(@Body() dto: CreateCategoryDto, @UploadedFile() uploadedFile: File): Promise<Category> {
    const { parentId, attributeIds, ...others } = dto;
    let category = this.categoryRepository.create(others);

    if (uploadedFile) {
      const file = await this.service.uploadFile(uploadedFile);
      category.imgUrl = file.publicUrl;
      category.imgName = file.name;
    }

    if (parentId) {
      const parent = await this.categoryRepository.findOne(parentId);
      if (!parent) throw new NotFoundException('Parent category not found!');
      category.parent = parent;
    }

    if (attributeIds?.length) {
      category.attributes = await this.attributeRepository.findByIds(attributeIds);
    }

    category = await this.categoryRepository.save(category);

    category.slug = this.slugService.createSlug(category.title, category.id);

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

    if (dto?.title) {
      category.title = dto.title;
      category.slug = this.slugService.createSlug(category.title, category.id);
    }

    if (uploadedFile) {
      // if (category.imgName) await this.service.removeFile(category.imgName);
      const file = await this.service.uploadFile(uploadedFile);
      category.imgUrl = file.publicUrl;
      category.imgName = file.name;
    }

    if (dto?.parentId) {
      const parent = await this.getOne(dto.parentId);
      category.parent = parent;
    } else category.parent = null;

    if (dto?.attributeIds?.length) {
      category.attributes = await this.attributeRepository.findByIds(dto.attributeIds);
    }

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
