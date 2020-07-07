import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDefined, IsNumber, Min, Validate } from 'class-validator';
import { Exist } from 'src/shared/Validators/Exist/exist.service';
import { Product } from '../products/products.entity';

export class CreateCartItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Validate(Exist, [Product, 'id'])
  productId: number;
}

export class UpdateCartItemDto extends PartialType(PickType(CreateCartItemDto, ['quantity'] as const)) {}
