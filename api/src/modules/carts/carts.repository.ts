import { Repository, EntityRepository } from 'typeorm';
import { Cart } from './carts.entity';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {}
