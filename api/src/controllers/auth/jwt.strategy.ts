import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Customer } from '../../entities/customers.entity';
import { JwtPayload } from '../../shared/Interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ email: payload.email });
    if (!customer || customer?.isBlock) throw new UnauthorizedException();
    return customer;
  }
}
