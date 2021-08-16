import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

import { JwtPayload } from '../shared/Interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }
}
