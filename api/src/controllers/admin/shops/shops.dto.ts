import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { ShopStatus } from '../../../shared/Enums/shops.enum';

export class AdminUpdateShopDto {
  @ApiPropertyOptional({ enum: ShopStatus })
  @IsOptional()
  @IsEnum(ShopStatus)
  status: ShopStatus;
}
