import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { Seller } from '../../../entities/sellers.entity';
import { Shop } from '../../../entities/shops.entity';
import { UploadOptions } from '../../../services/cloud-storage.service';
import { ShopsService } from '../../../services/shops.service';
import { File } from '../../../shared/Interfaces/file.interface';
import { CreateShopDto, UpdateShopDto } from './shops.dto';

@ApiTags('Shops')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('sellers/me/shops')
export class ShopsController {
  constructor(
    public service: ShopsService,
    @InjectRepository(Shop) private shopRepository: Repository<Shop>
  ) {}

  @ApiOperation({ summary: 'Retrieve many Shop' })
  @Get()
  async getMany(@UserInfo() seller: Seller): Promise<Shop[]> {
    return await this.service.getManyShopsBySeller(seller.id);
  }

  @ApiOperation({ summary: 'Retrieve one Shop' })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number, @UserInfo() seller: Seller): Promise<Shop> {
    const shop = await this.service.getOneShopBySeller(id, seller.id);
    if (!shop) throw new NotFoundException(`Shop ${id} not found`);
    return shop;
  }

  @ApiOperation({ summary: 'Create one Shop' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async createOne(
    @Body() dto: CreateShopDto,
    @UploadedFile() uploadedFile: File,
    @UserInfo() seller: Seller
  ): Promise<Shop> {
    const shop = this.shopRepository.create(dto);
    shop.sellers = [seller];

    if (uploadedFile) {
      const file = await this.service.uploadFile(uploadedFile);
      shop.coverImgUrl = file.publicUrl;
      shop.coverImgName = file.name;
    }

    return await this.shopRepository.save(shop);
  }

  @ApiOperation({ summary: 'Update one Shop' })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('attachment', UploadOptions))
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShopDto,
    @UploadedFile() uploadedFile: File,
    @UserInfo() seller: Seller
  ): Promise<Shop> {
    const shop = await this.service.getOneShopBySeller(id, seller.id);
    if (!shop) throw new NotFoundException(`Shop ${id} not found`);

    if (dto?.name) shop.name = dto.name;
    if (dto?.description) shop.description = dto.description;

    if (uploadedFile) {
      // if (shop.coverImgName) await this.service.removeFile(shop.coverImgName);
      const file = await this.service.uploadFile(uploadedFile);
      shop.coverImgUrl = file.publicUrl;
      shop.coverImgName = file.name;
    }

    return await this.shopRepository.save(shop);
  }
}
