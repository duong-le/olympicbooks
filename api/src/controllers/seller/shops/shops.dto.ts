import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

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

export class UpdateShopDto extends PartialType(CreateShopDto) {}
