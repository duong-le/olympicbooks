import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString, Validate } from 'class-validator';

import { ArrayExist } from '../../../core/Validators/array-exist/array-exist.service';
import { Exist } from '../../../core/Validators/exist/exist.service';
import { Author } from '../../../entities/authors.entity';
import { Category } from '../../../entities/categories.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Publisher } from '../../../entities/publishers.entity';
import { SellerProductStatus } from '../../../shared/Enums/products.enum';

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
  weight: number;

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

  @ApiProperty({ enum: SellerProductStatus })
  @IsDefined()
  @IsEnum(SellerProductStatus)
  status: SellerProductStatus;

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
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
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
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
  @IsNumber({}, { each: true })
  @Validate(ArrayExist, [ProductImage, 'id'])
  removedImageIds: number[];
}
