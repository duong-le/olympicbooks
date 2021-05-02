import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { AuthDto } from '../controllers/auth/auth.dto';
import { User } from '../entities/users.entity';
import { JwtPayload } from '../shared/Interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

  async authentication(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { email, password } = authDto;

    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    if (user?.isBlock) throw new ForbiddenException('User has been banned!');

    if (!compareSync(password, user.hashedPassword)) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { name: user.name, email, role: user.role };
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
}
