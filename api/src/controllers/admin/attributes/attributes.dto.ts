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

export class GetAttributeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateIf((dto: GetAttributeDto) => Boolean(dto.categoryId))
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId: number;
}

export class CreateAttributeDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  mandatory: boolean;

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
  name: string;
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {}
