import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Validate, ValidateIf } from 'class-validator';

import { ArrayExistValidator } from '../../../core/Utils/array-exist.validator';
import { Attribute } from '../../../entities/attribute.entity';

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

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((id: string) => Number(id)) : value
  )
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Validate(ArrayExistValidator, [Attribute, 'id'])
  attributeIds: number[];
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
