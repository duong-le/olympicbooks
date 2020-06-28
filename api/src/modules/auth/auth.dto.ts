import { IsEmail, IsString, MinLength, Matches, IsDefined } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class SignUpDto {
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

export class SignInDto extends PickType(SignUpDto, ['email'] as const) {
  @ApiProperty()
  @IsDefined()
  @IsString()
  password: string;
}
