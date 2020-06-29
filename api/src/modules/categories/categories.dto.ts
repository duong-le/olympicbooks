import { IsDefined, IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsUrl()
  img: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  parent: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
