import { ApiPropertyOptional, OmitType, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsBoolean, MinLength, MaxLength, Matches, IsDefined } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak'
  })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
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

export class UpdateMeDto extends OmitType(UpdateUserDto, ['email', 'isBlock'] as const) {}
