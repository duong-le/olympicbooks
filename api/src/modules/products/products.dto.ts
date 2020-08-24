import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber, IsArray, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { Exist } from 'src/shared/Validators/exist/exist.service';
import { ArrayExist } from 'src/shared/Validators/array-exist/array-exist.service';
import { CreateProductImageDto } from './product-images/product-images.dto';
import { CreateAuthorWithProductDto } from '../authors/authors.dto';
import { Category } from '../categories/categories.entity';
import { Publisher } from '../publishers/publishers.entity';
import { Author } from '../authors/authors.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  publicationYear: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  pages: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty({ type: [CreateProductImageDto] })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto[];

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Validate(Exist, [Category, 'id'])
  categoryId: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Validate(Exist, [Publisher, 'id'])
  publisherId: number;

  @ApiProperty({ type: [CreateAuthorWithProductDto] })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateAuthorWithProductDto)
  @Validate(ArrayExist, [Author, 'id', 'id'])
  authors: CreateAuthorWithProductDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
