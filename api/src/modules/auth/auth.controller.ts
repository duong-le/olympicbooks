import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  authentication(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.authentication(authDto);
  }
}
