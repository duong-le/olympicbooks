import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  transactionMethodId: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  shippingMethodId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyerNote: string;
}
