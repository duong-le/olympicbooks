import { IsDefined, IsString, IsUrl, IsInt, Min } from 'class-validator';
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
  @IsDefined()
  @IsInt()
  @Min(0)
  parentId: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
