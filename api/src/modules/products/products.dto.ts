import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber, Validate, IsBoolean, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Exist } from 'src/shared/Validators/exist/exist.service';
import { ArrayExist } from 'src/shared/Validators/array-exist/array-exist.service';
import { Category } from '../categories/categories.entity';
import { Publisher } from '../publishers/publishers.entity';
import { Author } from '../authors/authors.entity';
import { ProductImage } from './product-images.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  publicationYear: number;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  pages: number;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @Transform((value: string) => (typeof value === 'string' ? value.toLowerCase() === 'true' : value))
  @IsBoolean()
  inStock: boolean;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  @Validate(Exist, [Category, 'id'])
  categoryId: number;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsNumber()
  @Validate(Exist, [Publisher, 'id'])
  publisherId: number;

  @ApiProperty()
  @IsDefined()
  @Transform((value: string) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
  @IsNumber({}, { each: true })
  @Validate(ArrayExist, [Author, 'id'])
  authorIds: number[];

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsOptional()
  attachment: any;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value: string) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
  @IsNumber({}, { each: true })
  @Validate(ArrayExist, [ProductImage, 'id'])
  removedImageIds: number[];
}
