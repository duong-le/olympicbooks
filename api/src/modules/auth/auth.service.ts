import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/users.repository';
import { SignUpDto, SignInDto } from './auth.dto';
import { JwtPayload } from './jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { name, email, password } = signUpDto;
    const { hashedPassword, salt } = await this.hashPassword(password);
    return this.userRepository.createNewUser(name, email, hashedPassword, salt);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    const foundUser = await this.userRepository.findOne({ email });
    if (!foundUser) throw new UnauthorizedException('Invalid Credentials');
    if (foundUser.isBlock) throw new ForbiddenException('User has been banned!');

    const hashedPassword = await bcrypt.hash(password, foundUser.salt);
    if (hashedPassword !== foundUser.password) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { name: foundUser.name, email, role: foundUser.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async hashPassword(password: string): Promise<{ hashedPassword: string; salt: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token.split(' ')[1]);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
