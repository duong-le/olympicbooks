import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Publisher } from './publishers.entity';

@Injectable()
export class PublishersService extends TypeOrmCrudService<Publisher> {
  constructor(@InjectRepository(Publisher) private publisherRepository: Repository<Publisher>) {
    super(publisherRepository);
  }
}
