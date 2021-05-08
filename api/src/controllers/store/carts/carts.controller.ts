import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CustomerInfo } from '../../../core/Decorators/customer-info.decorator';
import { CartItem } from '../../../entities/carts.entity';
import { Customer } from '../../../entities/customers.entity';
import { CartsService } from '../../../services/carts.service';
import { CreateCartItemDto, UpdateCartItemDto } from './carts.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('me/carts')
@UseGuards(AuthGuard())
export class CartsController {
  constructor(public service: CartsService) {}

  @ApiOperation({ summary: 'Retrieve multiple CartItems' })
  @Get()
  getMany(@CustomerInfo() customer: Customer): Promise<CartItem[]> {
    return this.service.getManyCartItem(customer.id);
  }

  @ApiOperation({ summary: 'Create a single CartItem' })
  @Post()
  createOne(@Body() dto: CreateCartItemDto, @CustomerInfo() customer: Customer): Promise<CartItem> {
    return this.service.createCartItem(dto, customer.id);
  }

  @ApiOperation({ summary: 'Update a single CartItem' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartItemDto: UpdateCartItemDto
  ): Promise<CartItem> {
    return this.service.updateCartItem(id, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Delete a single CartItem' })
  @Delete(':id')
  deleteOne(
    @Param('id', ParseIntPipe) id: number,
    @CustomerInfo() customer: Customer
  ): Promise<void> {
    return this.service.deleteOneCartItem(id, customer.id);
  }

  @ApiOperation({ summary: 'Delete multiple CartItems' })
  @Delete()
  deleteMany(@CustomerInfo() customer: Customer): Promise<void> {
    return this.service.deleteCartItems(customer.id);
  }
}
