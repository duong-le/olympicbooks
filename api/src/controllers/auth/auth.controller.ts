import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../../services/auth.service';
import { AuthDto } from './auth.dto';

@ApiTags('Authentication')
@Controller(['auth', 'admin/auth'])
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  authentication(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.authentication(authDto);
  }
}
