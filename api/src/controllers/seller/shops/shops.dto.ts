import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

import { SellerShopStatus } from '../../../shared/Enums/shops.enum';

export class CreateShopDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  attachment: any;
}

export class UpdateShopDto extends PartialType(CreateShopDto) {
  @ApiPropertyOptional({ enum: SellerShopStatus })
  @IsOptional()
  @IsEnum(SellerShopStatus)
  status: SellerShopStatus;
}
