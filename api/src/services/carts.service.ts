import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCartItemDto, UpdateCartItemDto } from '../controllers/store/carts/carts.dto';
import { CartItem } from '../entities/carts.entity';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(CartItem) private cartRepository: Repository<CartItem>) {}

  async getManyCartItem(customerId: number): Promise<CartItem[]> {
    return await this.cartRepository.find({ customerId });
  }

  async createCartItem(dto: CreateCartItemDto, customerId: number): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne({ where: { productId: dto.productId, customerId } });
    if (cartItem) throw new ConflictException('CartItem is already exist');
    return await this.cartRepository.save({ ...dto, customerId });
  }

  async updateCartItem(id: number, dto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne(id);
    return await this.cartRepository.save({ ...cartItem, ...dto });
  }

  async deleteOneCartItem(id: number, customerId: number): Promise<void> {
    const result = await this.cartRepository.delete({ id, customerId });
    if (result.affected === 0) throw new NotFoundException('CartItem not found');
  }

  async deleteCartItems(customerId: number): Promise<void> {
    const result = await this.cartRepository.delete({ customerId });
    if (result.affected === 0) throw new NotFoundException('CartItems not found');
  }
}
