import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { CreateUserDto } from '../../../shared/Dto/users.dto';

export class CreateCustomerDto extends CreateUserDto {}

export class AdminUpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isBlock: boolean;
}

export class UpdateCustomerDto extends OmitType(AdminUpdateCustomerDto, ['email', 'isBlock'] as const) {}
