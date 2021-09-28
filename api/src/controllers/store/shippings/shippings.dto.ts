import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

import { ShippingState } from '../../../shared/Enums/shippings.enum';

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
