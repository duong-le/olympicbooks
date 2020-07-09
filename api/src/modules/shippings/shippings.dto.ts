import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  address: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  shippingMethodId: number;

  estimation: Date;
}

export class UpdateShippingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  estimation: Date;
}
