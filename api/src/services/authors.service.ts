import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { Author } from '../entities/authors.entity';

@Injectable()
export class AuthorsService extends TypeOrmCrudService<Author> {
  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) {
    super(authorRepository);
  }
}
