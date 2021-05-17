import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsNumber()
  fee: number;
}
