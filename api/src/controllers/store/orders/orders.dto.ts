import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { UpdateShippingDto } from '../shippings/shippings.dto';
import { UpdateTransactionDto } from '../transactions/transactions.dto';

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

export class UpdateOrderDto {
  @ApiPropertyOptional({ type: UpdateTransactionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateTransactionDto)
  transaction: UpdateTransactionDto;

  @ApiPropertyOptional({ type: UpdateShippingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateShippingDto)
  shipping: UpdateShippingDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyerNote: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sellerNote: string;
}
