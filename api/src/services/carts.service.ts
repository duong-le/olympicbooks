import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCartItemDto, UpdateCartItemDto } from '../controllers/carts/carts.dto';
import { CartItem } from '../entities/carts.entity';

@Injectable()
export class CartsService {
  constructor(@InjectRepository(CartItem) private cartRepository: Repository<CartItem>) {}

  async getManyCartItem(userId: number): Promise<CartItem[]> {
    return await this.cartRepository.find({ userId });
  }

  async createCartItem(dto: CreateCartItemDto, userId: number): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne({ where: { productId: dto.productId, userId } });
    if (cartItem) throw new ConflictException('CartItem is already exist');
    return await this.cartRepository.save({ ...dto, userId });
  }

  async updateCartItem(id: number, dto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne(id);
    return await this.cartRepository.save({ ...cartItem, ...dto });
  }

  async deleteOneCartItem(id: number, userId: number): Promise<void> {
    const result = await this.cartRepository.delete({ id, userId });
    if (result.affected === 0) throw new NotFoundException('CartItem not found');
  }

  async deleteCartItems(userId: number): Promise<void> {
    const result = await this.cartRepository.delete({ userId });
    if (result.affected === 0) throw new NotFoundException('CartItems not found');
  }
}
