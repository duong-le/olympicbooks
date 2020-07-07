import { Repository, EntityRepository } from 'typeorm';
import { CartItem } from './carts.entity';
import { User } from '../users/users.entity';
import { CreateCartItemDto } from './carts.dto';

@EntityRepository(CartItem)
export class CartRepository extends Repository<CartItem> {
  async createCartItem(dto: CreateCartItemDto, user: User): Promise<CartItem> {
    const cartItem = new CartItem();
    cartItem.userId = user.id;
    cartItem.quantity = dto.quantity;
    cartItem.productId = dto.productId;
    return await cartItem.save();
  }
}
