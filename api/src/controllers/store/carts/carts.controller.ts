import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { CartItem } from '../../../entities/carts.entity';
import { Customer } from '../../../entities/customers.entity';
import { Product } from '../../../entities/products.entity';
import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { CartsService } from '../../../services/carts.service';
import { CreateCartItemDto, UpdateCartItemDto } from './carts.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('customers/me/carts')
@UseGuards(AuthGuard())
export class CartsController {
  constructor(
    public service: CartsService,
    @InjectRepository(CartItem) private cartRepository: Repository<CartItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ShippingMethod) private shippingMethodRepository: Repository<ShippingMethod>
  ) {}

  @ApiOperation({ summary: 'Retrieve multiple CartItems' })
  @ApiQuery({ name: 'shippingMethodId', required: false })
  @Get()
  async getCart(
    @Query('shippingMethodId') shippingMethodId: string,
    @UserInfo() customer: Customer
  ): Promise<{
    orderValue: number;
    totalShippingFee: number;
    totalQuantity: number;
    items: { [key: string]: CartItem[] };
  }> {
    let shippingFee = 0;
    if (shippingMethodId) {
      const shippingMethod = await this.shippingMethodRepository.findOne(Number(shippingMethodId));
      if (shippingMethod) shippingFee = shippingMethod.fee;
    }

    const cartItems = await this.cartRepository.find({ customerId: customer.id });
    const items = await this.service.getCartOrderedByShop(cartItems);

    const cart = { orderValue: 0, totalShippingFee: 0, totalQuantity: 0, items };
    for (const [shopId, cartItems] of Object.entries(items)) {
      cart.orderValue += this.service.calculateTotalValue(cartItems) + shippingFee;
      cart.totalShippingFee += shippingFee;
      cart.totalQuantity += this.service.calculateTotalQty(cartItems);
    }

    return cart;
  }

  @ApiOperation({ summary: 'Create a single CartItem' })
  @Post()
  async createOne(@Body() dto: CreateCartItemDto, @UserInfo() customer: Customer): Promise<CartItem> {
    const product = this.productRepository.findOne(dto.productId);
    if (!product) throw new NotFoundException(`Product ${dto.productId} not found`);

    const cartItem = await this.cartRepository.findOne({
      where: { productId: dto.productId, customerId: customer.id }
    });
    if (cartItem) throw new ConflictException('CartItem is already exist');

    return await this.cartRepository.save({
      quantity: dto.quantity,
      productId: dto.productId,
      customerId: customer.id
    });
  }

  @ApiOperation({ summary: 'Update a single CartItem' })
  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne(id);
    cartItem.quantity = dto.quantity;
    return await this.cartRepository.save(cartItem);
  }

  @ApiOperation({ summary: 'Delete a single CartItem' })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number, @UserInfo() customer: Customer): Promise<void> {
    const result = await this.cartRepository.delete({ id, customerId: customer.id });
    if (result.affected === 0) throw new NotFoundException('CartItem not found');
  }

  @ApiOperation({ summary: 'Delete multiple CartItems' })
  @Delete()
  async deleteMany(@UserInfo() customer: Customer): Promise<void> {
    const result = await this.cartRepository.delete({ customerId: customer.id });
    if (result.affected === 0) throw new NotFoundException('CartItems not found');
  }
}
