import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty()
  @IsDefined()
  @IsUrl()
  url: string;
}

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
