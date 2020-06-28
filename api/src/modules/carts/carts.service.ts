import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './carts.entity';
import { CartRepository } from './carts.repository';

@Injectable()
export class CartsService extends TypeOrmCrudService<Cart> {
  constructor(@InjectRepository(CartRepository) private cartRepository: CartRepository) {
    super(cartRepository);
  }
}
