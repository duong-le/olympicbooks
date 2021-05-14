import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsOptional, IsString, Min } from 'class-validator';

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
