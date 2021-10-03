import {
  BadRequestException,
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
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from 'src/shared/Enums/products.enum';
import { Repository } from 'typeorm';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { Cart, CartItem } from '../../../entities/carts.entity';
import { Customer } from '../../../entities/customers.entity';
import { Product } from '../../../entities/products.entity';
import { ShippingMethod } from '../../../entities/shipping-methods.entity';
import { CartsService } from '../../../services/carts.service';
import { UserType } from '../../../shared/Enums/users.enum';
import { CreateCartItemDto, UpdateCartItemDto } from './carts.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('customers/me/carts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.CUSTOMER)
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
    @Query('shippingMethodId', ParseIntPipe) shippingMethodId: number,
    @UserInfo() customer: Customer
  ): Promise<Cart> {
    let shippingFee = 0;
    if (shippingMethodId) {
      const shippingMethod = await this.shippingMethodRepository.findOne(shippingMethodId);
      if (shippingMethod) shippingFee = shippingMethod.fee;
    }

    const cartItems = await this.cartRepository.find({ customerId: customer.id });

    return {
      orderValue: this.service.calculateOrderValue(cartItems) + shippingFee,
      shippingFee,
      quantity: this.service.calculateCartQuantity(cartItems),
      items: cartItems
    };
  }

  @ApiOperation({ summary: 'Create a single CartItem' })
  @Post()
  async createOne(@Body() dto: CreateCartItemDto, @UserInfo() customer: Customer): Promise<CartItem> {
    const product = await this.productRepository.findOne(dto.productId);
    if (!product) throw new NotFoundException(`Product ${dto.productId} not found`);

    if (product.status !== ProductStatus.ACTIVE)
      throw new BadRequestException(`Product ${product.id} is not active`);

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

    if (cartItem.product.status !== ProductStatus.ACTIVE)
      throw new BadRequestException(`Product ${cartItem.product.id} is not active`);

    cartItem.quantity = dto.quantity;
    return await this.cartRepository.save(cartItem);
  }

  @ApiOperation({ summary: 'Delete a single CartItem' })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.cartRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('CartItem not found');
  }

  @ApiOperation({ summary: 'Delete multiple CartItems' })
  @Delete()
  async deleteMany(@UserInfo() customer: Customer): Promise<void> {
    const result = await this.cartRepository.delete({ customerId: customer.id });
    if (result.affected === 0) throw new NotFoundException('CartItems not found');
  }
}
