import {
  BadRequestException,
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
import { Repository, TreeRepository } from 'typeorm';

import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Attribute } from '../../../entities/attribute.entity';
import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { UploadOptions } from '../../../services/cloud-storage.service';
import { File } from '../../../shared/Interfaces/file.interface';
import { SellerCategoriesController } from '../../seller/categories/categories.controller';
import { CreateAttributeDto, CreateCategoryDto, UpdateAttributeDto, UpdateCategoryDto } from './categories.dto';

@ApiTags('Admin Categories')
@ApiBearerAuth()
@Controller('admin/categories')
@UseGuards(AuthGuard())
export class AdminCategoriesController extends SellerCategoriesController {
  constructor(
    public service: CategoriesService,
    @InjectRepository(Category) public categoryRepository: TreeRepository<Category>,
    @InjectRepository(Attribute) public attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeValue) public attributeValueRepository: Repository<AttributeValue>
  ) {
    super(service, categoryRepository, attributeRepository, attributeValueRepository);
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

  @ApiOperation({ summary: 'Create one Attribute by category' })
  @Post(':categoryId/attributes')
  async createOneAttribute(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: CreateAttributeDto
  ): Promise<Attribute> {
    try {
      return await this.attributeRepository.save({ ...dto, categoryId });
    } catch (error) {
      throw new BadRequestException(error?.code === '23505' ? `Attribute ${dto.name} already exists` : '');
    }
  }

  @ApiOperation({ summary: 'Update one Attribute by category' })
  @Patch(':categoryId/attributes/:attributeId')
  async updateOneAttribute(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Body() dto: UpdateAttributeDto
  ): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne({ categoryId, id: attributeId });
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    return await this.attributeRepository.save({ ...attribute, ...dto });
  }

  @ApiOperation({ summary: 'Delete one Attribute by category' })
  @Delete(':categoryId/attributes/:attributeId')
  async deleteOneAttribute(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number
  ): Promise<void> {
    const attribute = await this.attributeRepository.findOne({ categoryId, id: attributeId });
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    await this.attributeRepository.softDelete(attribute.id);
  }

  @ApiOperation({ summary: 'Delete one Attribute Value by category' })
  @Delete(':categoryId/attributes/:attributeId/attribute-values/:attributeValueId')
  async deleteOneAttributeValue(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Param('attributeValueId', ParseIntPipe) attributeValueId: number
  ): Promise<void> {
    const attributeValue = await this.service.getOneAttributeValueByCategory(
      categoryId,
      attributeId,
      attributeValueId
    );
    if (!attributeValue) throw new NotFoundException(`Attribute Value ${attributeValueId} not found`);

    await this.attributeValueRepository.softDelete(attributeValue.id);
  }
}
