import { BadRequestException, Body, ConflictException, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { Seller } from '../../../entities/sellers.entity';
import { SellersService } from '../../../services/sellers.service';
import { ShopsService } from '../../../services/shops.service';
import { CreateSellerDto, UpdateSellerDto } from './sellers.dto';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(public service: SellersService, public shopsService: ShopsService) {}

  @ApiOperation({ summary: 'Create a single Seller' })
  @Post()
  async createSeller(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
    try {
      const seller = await this.service.createSeller(createSellerDto);
      return plainToClass(Seller, seller);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Email already exists')
        : new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Retrieve a single Seller' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  async findSeller(@UserInfo() seller: Seller): Promise<Seller> {
    seller.shops = await this.shopsService.getManyShopsBySeller(seller.id);
    return seller;
  }

  @ApiOperation({ summary: 'Update a single Seller' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch('me')
  async updateSeller(@Body() updateSellerDto: UpdateSellerDto, @UserInfo() seller: Seller): Promise<Seller> {
    try {
      const updatedSeller = await this.service.updateSeller(seller, updateSellerDto);
      return plainToClass(Seller, updatedSeller);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Email already exists')
        : new BadRequestException(error?.message);
    }
  }
}
