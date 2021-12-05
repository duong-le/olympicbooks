import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min, Validate } from 'class-validator';

import { ArrayExistValidator } from '../../../core/Utils/array-exist.validator';
import { AttributeValue } from '../../../entities/attribute-value.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { ProductStatus } from '../../../shared/Enums/products.enum';

export class CreateProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',').map((id: string) => Number(id)) : value
  )
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Validate(ArrayExistValidator, [AttributeValue, 'id'])
  attributeValueIds: number[];

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  originalPrice: number;

  @ApiProperty({ enum: ProductStatus, default: ProductStatus.ACTIVE })
  @IsDefined()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty()
  @IsDefined()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsOptional()
  attachment: any;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map((id) => Number(id)) : value))
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @Validate(ArrayExistValidator, [ProductImage, 'id'])
  removedImageIds: number[];
}
