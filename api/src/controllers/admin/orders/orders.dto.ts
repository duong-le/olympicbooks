import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsInt, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

import { ShippingState } from '../../../shared/Enums/shippings.enum';
import { TransactionState } from '../../../shared/Enums/transactions.enum';

export class UpdateTransactionDto {
  @ApiPropertyOptional({ enum: TransactionState })
  @IsDefined()
  @IsEnum(TransactionState)
  state: TransactionState;
}

export class UpdateShippingDto {
  @ApiPropertyOptional({ enum: ShippingState })
  @IsOptional()
  @IsEnum(ShippingState)
  state: ShippingState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  fee: number;
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
