import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
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
    const hashedPassword = this.hashPassword(password);
    return this.userRepository.createNewUser(name, email, hashedPassword);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    const foundUser = await this.userRepository.findOne({ email });
    if (!foundUser) throw new UnauthorizedException('Invalid Credentials');
    if (foundUser.isBlock) throw new ForbiddenException('User has been banned!');

    if (!compareSync(password, foundUser.hashedPassword)) throw new UnauthorizedException('Invalid Credentials');

    const payload: JwtPayload = { name: foundUser.name, email, role: foundUser.role };
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
