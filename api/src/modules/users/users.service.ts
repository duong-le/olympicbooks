import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { UpdateUserDto, UpdateMeDto } from './users.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private authService: AuthService) {
    super(userRepository);
  }

  async updateUser(dto: UpdateUserDto | UpdateMeDto, id: number): Promise<User> {
    const { password, ...others } = dto;
    if (password) {
      const hashedPassword = this.authService.hashPassword(dto.password);
      return await this.userRepository.updateUser({ ...others, hashedPassword }, id);
    }
    return await this.userRepository.updateUser(others, id);
  }

  async getMe(user: User): Promise<User> {
    return await this.userRepository.findOne(user.id);
  }
}
