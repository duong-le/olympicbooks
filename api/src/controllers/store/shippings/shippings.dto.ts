import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { DeliveryState } from '../../../shared/Enums/delivery-state.enum';

export class CreateShippingDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  address: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  shippingMethodId: number;
}

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
