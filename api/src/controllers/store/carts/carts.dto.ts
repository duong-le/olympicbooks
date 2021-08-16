import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsDefined()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  @IsPositive()
  productId: number;
}

export class UpdateCartItemDto extends PartialType(PickType(CreateCartItemDto, ['quantity'] as const)) {}
