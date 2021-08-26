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
  Query,
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
import { UserType } from '../../../shared/Enums/users.enum';
import {
  CreateAttributeDto,
  CreateAttributeValueDto,
  GetAttributeDto,
  UpdateAttributeDto,
  UpdateAttributeValueDto,
} from './attributes.dto';

@ApiTags('Admin Attributes')
@ApiBearerAuth()
@Controller('admin/attributes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
export class AdminAttributesController {
  constructor(
    @InjectRepository(Attribute) public attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeValue) public attributeValueRepository: Repository<AttributeValue>
  ) {}

  @ApiOperation({ summary: 'Retrieve many Attribute' })
  @Get()
  async getManyAttributes(@Query() { categoryId }: GetAttributeDto): Promise<Attribute[]> {
    const query = this.attributeRepository
      .createQueryBuilder('attribute')
      .leftJoinAndSelect('attribute.attributeValues', 'attributeValue');

    if (categoryId)
      query.leftJoin('attribute.categories', 'category').where('category.id = :categoryId', { categoryId });

    return await query.getMany();
  }

  @ApiOperation({ summary: 'Retrieve one Attribute' })
  @Get(':attributeId')
  async getOneAttribute(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne(attributeId);
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    return attribute;
  }

  @ApiOperation({ summary: 'Create one Attribute' })
  @Post()
  async createOneAttribute(@Body() dto: CreateAttributeDto): Promise<Attribute> {
    try {
      return await this.attributeRepository.save(dto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Update one Attribute' })
  @Patch(':attributeId')
  async updateOneAttribute(
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Body() dto: UpdateAttributeDto
  ): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne(attributeId);
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    return await this.attributeRepository.save({ ...attribute, ...dto });
  }

  @ApiOperation({ summary: 'Delete one Attribute' })
  @Delete(':attributeId')
  async deleteOneAttribute(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<void> {
    const attribute = await this.attributeRepository.findOne(attributeId);
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    await this.attributeRepository.softDelete(attribute.id);
  }

  @ApiOperation({ summary: 'Create one Attribute Value' })
  @Post(':attributeId/attribute-values')
  async createOneAttributeValue(
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Body() dto: CreateAttributeValueDto
  ): Promise<AttributeValue> {
    const attribute = await this.attributeRepository.findOne(attributeId);
    if (!attribute) throw new NotFoundException(`Attribute ${attributeId} not found`);

    try {
      return await this.attributeValueRepository.save({ ...dto, attributeId });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Update one Attribute Value' })
  @Patch(':attributeId/attribute-values/:attributeValueId')
  async updateOneAttributeValue(
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Param('attributeValueId', ParseIntPipe) attributeValueId: number,
    @Body() dto: UpdateAttributeValueDto
  ): Promise<AttributeValue> {
    const attributeValue = await this.attributeValueRepository.findOne({
      id: attributeValueId,
      attributeId
    });
    if (!attributeValue) throw new NotFoundException(`Attribute Value ${attributeValueId} not found`);

    if (dto?.name) attributeValue.name = dto.name;

    return await this.attributeValueRepository.save(attributeValue);
  }

  @ApiOperation({ summary: 'Delete one Attribute Value' })
  @Delete(':attributeId/attribute-values/:attributeValueId')
  async deleteOneAttributeValue(
    @Param('attributeId', ParseIntPipe) attributeId: number,
    @Param('attributeValueId', ParseIntPipe) attributeValueId: number
  ): Promise<void> {
    const attributeValue = await this.attributeValueRepository.findOne({
      id: attributeValueId,
      attributeId
    });
    if (!attributeValue) throw new NotFoundException(`Attribute Value ${attributeValueId} not found`);

    await this.attributeValueRepository.softDelete(attributeValue.id);
  }
}
