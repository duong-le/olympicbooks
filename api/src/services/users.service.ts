import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateMeDto, UpdateUserDto } from '../controllers/users/users.dto';
import { User } from '../controllers/users/users.entity';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private authService: AuthService) {
    super(userRepository);
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const { name, email, password } = dto;
    const hashedPassword = this.authService.hashPassword(password);
    try {
      return await this.userRepository.save({ name, email, hashedPassword });
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }

  async updateUser(id: number, dto: UpdateUserDto | UpdateMeDto): Promise<User> {
    let hashedPassword: string;
    const { password, ...others } = dto;
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException(`User ${id} not found`);
    if (password) hashedPassword = this.authService.hashPassword(dto.password);
    try {
      return await this.userRepository.save({ ...user, ...others, ...(password && { hashedPassword }) });
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }
}
