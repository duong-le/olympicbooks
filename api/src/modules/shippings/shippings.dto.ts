import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { DeliveryState } from '../../shared/Enums/delivery-state.enum';

export class CreateShippingDto {
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
}
