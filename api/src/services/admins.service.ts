import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@rewiko/crud-typeorm';
import { Repository } from 'typeorm';

import { Admin } from '../entities/admins.entity';

@Injectable()
export class AdminsService extends TypeOrmCrudService<Admin> {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {
    super(adminRepository);
  }
}
