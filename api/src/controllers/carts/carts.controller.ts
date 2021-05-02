import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserInfo } from '../../core/Decorators/user-info.decorator';
import { CartItem } from '../../entities/carts.entity';
import { User } from '../../entities/users.entity';
import { CartsService } from '../../services/carts.service';
import { CreateCartItemDto, UpdateCartItemDto } from './carts.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('mine/carts')
@UseGuards(AuthGuard())
export class CartsController {
  constructor(public service: CartsService) {}

  @ApiOperation({ summary: 'Retrieve multiple CartItems' })
  @Get()
  getMany(@UserInfo() user: User): Promise<CartItem[]> {
    return this.service.getManyCartItem(user.id);
  }

  @ApiOperation({ summary: 'Create a single CartItem' })
  @Post()
  createOne(@Body() dto: CreateCartItemDto, @UserInfo() user: User): Promise<CartItem> {
    return this.service.createCartItem(dto, user.id);
  }

  @ApiOperation({ summary: 'Update a single CartItem' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    return this.service.updateCartItem(id, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Delete a single CartItem' })
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number, @UserInfo() user: User): Promise<void> {
    return this.service.deleteOneCartItem(id, user.id);
  }

  @ApiOperation({ summary: 'Delete multiple CartItems' })
  @Delete()
  deleteMany(@UserInfo() user: User): Promise<void> {
    return this.service.deleteCartItems(user.id);
  }
}
