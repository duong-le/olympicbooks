import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Author } from './authors.entity';

@Injectable()
export class AuthorsService extends TypeOrmCrudService<Author> {
  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>) {
    super(authorRepository);
  }
}
