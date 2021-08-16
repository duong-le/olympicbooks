import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CartItem } from '../entities/carts.entity';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(CartItem) private cartRepository: Repository<CartItem>) {}

  async filterInvalidCartItems(cartItems: CartItem[]): Promise<CartItem[]> {
    for (const [index, cartItem] of cartItems.entries()) {
      if (!cartItem?.product) {
        await this.cartRepository.delete(cartItem.id);
        cartItems.splice(index, 1);
      }
    }
    return cartItems;
  }

  calculateCartQuantity(cartItems: CartItem[]) {
    return cartItems.reduce((total: number, current: CartItem) => (total += current.quantity), 0);
  }

  calculateOrderValue(cartItems: CartItem[]) {
    return cartItems.reduce(
      (total: number, current: CartItem) => (total += current.quantity * current.product.price),
      0
    );
  }
}
