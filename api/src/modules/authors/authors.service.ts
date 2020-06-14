import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './authors.entity';
import { AuthorRepository } from './authors.repository';

@Injectable()
export class AuthorsService extends TypeOrmCrudService<Author> {
  constructor(@InjectRepository(AuthorRepository) private authorRepository: AuthorRepository) {
    super(authorRepository);
  }
}
