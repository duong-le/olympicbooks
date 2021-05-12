import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { Admin } from '../../entities/admins.entity';
import { Customer } from '../../entities/customers.entity';
import { Seller } from '../../entities/sellers.entity';
import { UserType } from '../../shared/Enums/users.enum';
import { JwtPayload } from '../../shared/Interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload): Promise<Customer | Admin> {
    let user: Customer | Admin;

    switch (payload.type) {
      case UserType.CUSTOMER: {
        user = await this.customerRepository.findOne({ email: payload.email });
        break;
      }
      case UserType.ADMIN: {
        user = await this.adminRepository.findOne({ email: payload.email });
        break;
      }
      case UserType.SELLER: {
        user = await this.sellerRepository.findOne({ email: payload.email });
        break;
      }
    }

    if (!user || user?.isBlock) throw new UnauthorizedException();
    return user;
  }
}
