import { Repository, EntityRepository } from 'typeorm';
import { Author } from './authors.entity';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {}
