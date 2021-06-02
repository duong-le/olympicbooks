import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';

import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Attribute } from '../../../entities/attribute.entity';
import { Category } from '../../../entities/categories.entity';
import { CategoriesService } from '../../../services/categories.service';
import { CategoriesController } from '../../store/categories/categories.controller';
import { CreateAttributeValueDto, UpdateAttributeValueDto } from './categories.dto';

@ApiTags('Seller Categories')
@ApiBearerAuth()
@Controller('sellers/categories')
@UseGuards(AuthGuard())
export class SellerCategoriesController extends CategoriesController {
  constructor(
    public service: CategoriesService,
    @InjectRepository(Category) public categoryRepository: TreeRepository<Category>,
    @InjectRepository(Attribute) public attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeValue) public attributeValueRepository: Repository<AttributeValue>
  ) {
    super(service, categoryRepository);
  }

  @ApiOperation({ summary: 'Retrieve many Attribute by category' })
  @Get(':categoryId/attributes')
  async getManyAttributes(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<Attribute[]> {
    return await this.attributeRepository.find({
      where: { categoryId },
      relations: ['attributeValues']
    });
  }

  @ApiOperation({ summary: 'Retrieve one Attribute by category' })
  @Get(':categoryId/attributes/:attributeId')
  async getOneAttribute(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number
  ): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne({
      where: { categoryId, id: attributeId },
      relations: ['attributeValues']
    });
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    return attribute;
  }

  @ApiOperation({ summary: 'Create one Attribute Value by category' })
  @Post(':categoryId/attributes/:attributeId/attribute-values')
  async createOneAttributeValue(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Body() dto: CreateAttributeValueDto
  ): Promise<AttributeValue> {
    const attribute = await this.attributeRepository.findOne({ categoryId, id: attributeId });
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    try {
      return await this.attributeValueRepository.save({ ...dto, attributeId });
    } catch (error) {
      throw new BadRequestException(
        error?.code === '23505' ? `Attribute value ${dto.value} already exists` : ''
      );
    }
  }

  @ApiOperation({ summary: 'Update one Attribute Value by category' })
  @Patch(':categoryId/attributes/:attributeId/attribute-values/:attributeValueId')
  async updateOneAttributeValue(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Param('attributeValueId', ParseIntPipe) attributeValueId: number,
    @Body() dto: UpdateAttributeValueDto
  ): Promise<AttributeValue> {
    const attributeValue = await this.service.getOneAttributeValueByCategory(
      categoryId,
      attributeId,
      attributeValueId
    );
    if (!attributeValue) throw new NotFoundException(`Attribute Value ${attributeValueId} not found`);

    if (dto?.value) attributeValue.value = dto.value;

    return await this.attributeValueRepository.save(attributeValue);
  }
}
