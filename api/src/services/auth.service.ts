import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { AuthDto } from '../controllers/auth/auth.dto';
import { Customer } from '../entities/customers.entity';
import { JwtPayload } from '../shared/Interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>, private jwtService: JwtService) {}

  async authentication(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { email, password } = authDto;

    const customer = await this.customerRepository.findOne({ email });
    if (!customer) throw new UnauthorizedException('Invalid Credentials');
    if (customer?.isBlock) throw new ForbiddenException('Customer has been banned!');

    if (!compareSync(password, customer.hashedPassword)) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { name: customer.name, email, role: customer.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  decodeToken(request: Request): any {
    try {
      const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      return this.jwtService.decode(jwtToken);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  validateRole(allowedRoles: number[], request: Request): boolean {
    if (!allowedRoles) return true;

    const customer = this.decodeToken(request);
    return allowedRoles.includes(customer?.role);
  }
}
