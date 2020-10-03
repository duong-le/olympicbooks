import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { AuthDto } from './auth.dto';
import { JwtPayload } from './jwt-payload.model';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

  async authentication(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { email, password } = authDto;

    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    if (user.isBlock) throw new ForbiddenException('User has been banned!');

    if (!compareSync(password, user.hashedPassword)) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { name: user.name, email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token.split(' ')[1]);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
