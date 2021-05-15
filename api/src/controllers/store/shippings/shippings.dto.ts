import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { DeliveryState } from '../../../shared/Enums/delivery-state.enum';

export class UpdateShippingDto {
  @ApiPropertyOptional({ enum: DeliveryState })
  @IsOptional()
  @IsEnum(DeliveryState)
  state: DeliveryState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fee: number;
}
