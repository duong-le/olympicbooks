import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Attribute } from '../../../entities/attribute.entity';
import { CategoriesService } from '../../../services/categories.service';
import { UserType } from '../../../shared/Enums/users.enum';
import { CreateAttributeDto, CreateAttributeValueDto, UpdateAttributeDto, UpdateAttributeValueDto } from './categories.dto';

@ApiTags('Admin Attributes')
@ApiBearerAuth()
@Controller('admin/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
export class AdminAttributesController {
  constructor(
    public service: CategoriesService,
    @InjectRepository(Attribute) public attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeValue) public attributeValueRepository: Repository<AttributeValue>
  ) {}

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
