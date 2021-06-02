import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { AttributeInputMode } from '../../../shared/Enums/attributes.enum';

export class CreateCategoryDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  parentId: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  attachment: any;
}

export class UpdateCategoryDto extends PartialType(OmitType(CreateCategoryDto, ['parentId'] as const)) {}

export class CreateAttributeDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
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
