import { Repository, EntityRepository } from 'typeorm';
import { User } from './users.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createNewUser(name: string, email: string, hashedPassword: string): Promise<void> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.hashedPassword = hashedPassword;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(user: Partial<User>, id: number): Promise<User> {
    try {
      await this.update(id, user);
      return this.findOne(id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
