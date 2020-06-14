import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super(userRepository);
  }
}
