import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  productId: number;

  orderId: number;
  totalValue: number;
}
