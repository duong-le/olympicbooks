import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

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

  estimationDate: Date;
}

export class UpdateShippingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  estimationDate: Date;
}
