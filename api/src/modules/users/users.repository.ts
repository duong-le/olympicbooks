import { Repository, EntityRepository } from 'typeorm';
import { User } from './users.entity';
import { Logger, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto, UpdateMeDto } from './users.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger();

  async createNewUser(name: string, email: string, password: string, salt: string): Promise<void> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.salt = salt;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(dto: UpdateUserDto | UpdateMeDto, id: number): Promise<void> {
    try {
      await this.update(id, dto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
