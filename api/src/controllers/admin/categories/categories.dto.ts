import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

import { AttributeInputMode } from '../../../shared/Enums/attributes.enum';

export class CreateCategoryDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateIf((dto: CreateCategoryDto) => Boolean(dto.parentId))
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  parentId: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  attachment: any;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CreateAttributeDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty({ enum: AttributeInputMode, default: AttributeInputMode.DEFAULT })
  @IsDefined()
  @IsEnum(AttributeInputMode)
  inputMode: AttributeInputMode;
}

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}

export class CreateAttributeValueDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {}
