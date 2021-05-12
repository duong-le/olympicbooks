import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  decodeToken(jwtToken: string): any {
    try {
      return this.jwtService.decode(jwtToken);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  validateRole(allowedRoles: number[], jwtToken: string): boolean {
    if (!allowedRoles) return true;

    const customer = this.decodeToken(jwtToken);
    return allowedRoles.includes(customer?.role);
  }
}
