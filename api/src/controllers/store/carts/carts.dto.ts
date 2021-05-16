import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsDefined, IsNumber, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  productId: number;
}

export class UpdateCartItemDto extends PartialType(PickType(CreateCartItemDto, ['quantity'] as const)) {}
