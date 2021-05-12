import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Matches, MinLength } from 'class-validator';

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
