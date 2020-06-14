import { Repository, EntityRepository } from 'typeorm';
import { Publisher } from './publishers.entity';

@EntityRepository(Publisher)
export class PublisherRepository extends Repository<Publisher> {}
