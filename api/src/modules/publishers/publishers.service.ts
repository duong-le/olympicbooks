import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './publishers.entity';
import { PublisherRepository } from './publishers.repository';

@Injectable()
export class PublishersService extends TypeOrmCrudService<Publisher> {
  constructor(@InjectRepository(PublisherRepository) private publisherRepository: PublisherRepository) {
    super(publisherRepository);
  }
}
