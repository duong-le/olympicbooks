import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CartItem } from '../entities/carts.entity';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(CartItem) private cartRepository: Repository<CartItem>) {}

  async getCartOrderedByShop(cartItems: CartItem[]): Promise<{ [key: string]: CartItem[] }> {
    const cart = {};
    for (const cartItem of cartItems) {
      const shopId = cartItem.product.shopId;
      if (!(shopId in cart)) cart[shopId] = [];
      cart[shopId].push(cartItem);
    }
    return cart;
  }

  calculateTotalQty(cartItems: CartItem[]) {
    return cartItems.reduce((total: number, current: CartItem) => (total += current.quantity), 0);
  }

  calculateTotalValue(cartItems: CartItem[]) {
    return cartItems.reduce(
      (total: number, current: CartItem) => (total += current.quantity * current.product.price),
      0
    );
  }
}
