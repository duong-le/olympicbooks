import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { UpdateShippingDto } from '../../store/shippings/shippings.dto';
import { UpdateTransactionDto } from '../../store/transactions/transactions.dto';

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
