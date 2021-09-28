import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsDefined()
  @IsInt()
  @IsPositive()
  transactionMethodId: number;

  @ApiProperty()
  @IsDefined()
  @IsInt()
  @IsPositive()
  shippingMethodId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyerNote: string;
}
