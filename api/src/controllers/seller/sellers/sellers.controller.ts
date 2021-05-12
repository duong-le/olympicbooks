import { BadRequestException, Body, ConflictException, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { Seller } from '../../../entities/sellers.entity';
import { SellersService } from '../../../services/sellers.service';
import { CreateSellerDto, UpdateSellerDto } from './sellers.dto';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly service: SellersService) {}

  @ApiOperation({ summary: 'Create a single Seller' })
  @Post()
  async createSeller(@Body() createSellerDto: CreateSellerDto) {
    try {
      return await this.service.createSeller(createSellerDto);
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Retrieve a single Seller' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  findSeller(@UserInfo() seller: Seller): Seller {
    return seller;
  }

  @ApiOperation({ summary: 'Update a single Seller' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch('me')
  async updateSeller(@Body() updateSellerDto: UpdateSellerDto, @UserInfo() seller: Seller) {
    try {
      return await this.service.updateSeller(seller.id, updateSellerDto);
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }
}
