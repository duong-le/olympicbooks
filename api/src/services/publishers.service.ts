import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { Publisher } from '../entities/publishers.entity';

@Injectable()
export class PublishersService extends TypeOrmCrudService<Publisher> {
  constructor(@InjectRepository(Publisher) private publisherRepository: Repository<Publisher>) {
    super(publisherRepository);
  }
}
