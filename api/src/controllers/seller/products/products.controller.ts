import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { Author } from '../../../entities/authors.entity';
import { Category } from '../../../entities/categories.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { Publisher } from '../../../entities/publishers.entity';
import { Seller } from '../../../entities/sellers.entity';
import { UploadOptions } from '../../../services/cloud-storage.service';
import { ProductsService } from '../../../services/products.service';
import { ShopsService } from '../../../services/shops.service';
import { File } from '../../../shared/Interfaces/file.interface';
import { CreateProductDto, UpdateProductDto } from '../../admin/products/products.dto';

@ApiTags('Shop Products')
@ApiBearerAuth()
@Controller('shops/:shopId/products')
@UseGuards(AuthGuard())
export class ShopProductsController {
  constructor(
    public service: ProductsService,
    public shopService: ShopsService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Publisher) private publisherRepository: Repository<Publisher>
  ) {}

  @ApiOperation({ summary: 'Retrieve many Product' })
  @Get()
  async getMany(
    @Param('shopId', ParseIntPipe) shopId: number,
    @UserInfo() seller: Seller
  ): Promise<Product[]> {
    return await this.service.getManyProductsByShopAndSeller(shopId, seller.id);
  }

  @ApiOperation({ summary: 'Retrieve a single Product' })
  @Get(':productId')
  async getOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @UserInfo() seller: Seller
  ): Promise<Product> {
    const product = await this.service.getOneProductByShopAndSeller(productId, shopId, seller.id);
    if (!product) throw new NotFoundException(`Product ${productId} not found`);
    return product;
  }

  @ApiOperation({ summary: 'Create a single Product' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  async createOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Body() dto: CreateProductDto,
    @UploadedFiles() uploadedFiles: File[],
    @UserInfo() seller: Seller
  ): Promise<Product> {
    const shop = await this.shopService.getOneShopBySeller(shopId, seller.id);
    if (!shop) throw new NotFoundException(`Shop ${shopId} not found`);

    const { authorIds, ...others } = dto;

    const product = this.productRepository.create({ ...others, shopId });
    product.authors = await this.authorRepository.findByIds(authorIds);

    if (uploadedFiles?.length) {
      product.images = await this.service.createProductImages(uploadedFiles);
    }
    return await this.productRepository.save(product);
  }

  @ApiOperation({ summary: 'Update a single Product' })
  @ApiConsumes('multipart/form-data')
  @Patch(':productId')
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  async updateOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @UserInfo() seller: Seller,
    @Body() dto: UpdateProductDto,
    @UploadedFiles() uploadedFiles: File[]
  ): Promise<Product> {
    const product = await this.service.getOneProductByShopAndSeller(productId, shopId, seller.id);
    if (!product) throw new NotFoundException(`Product ${productId} not found`);

    const { authorIds, removedImageIds, ...others } = dto;
    if (dto?.categoryId && product?.category?.id !== dto.categoryId) {
      product.category = await this.categoryRepository.findOne(dto.categoryId);
    }

    if (authorIds?.length) {
      product.authors = await this.authorRepository.findByIds(authorIds);
    }

    if (dto?.publisherId && product?.publisher?.id !== dto.publisherId) {
      product.publisher = await this.publisherRepository.findOne(dto.publisherId);
    }

    if (uploadedFiles?.length) {
      const imageFiles = await this.service.createProductImages(uploadedFiles);
      product.images.push(...imageFiles);
    }

    if (removedImageIds?.length) {
      product.images = product.images.filter((image) => !removedImageIds.includes(image.id));
      // await this.service.removeProductImages(await this.productImageRepository.findByIds(removedImageIds));
      await this.productImageRepository.softDelete(removedImageIds);
    }
    return await this.productRepository.save({ ...product, ...others });
  }

  @ApiOperation({ summary: 'Delete one Product' })
  @Delete(':productId')
  async deleteOne(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @UserInfo() seller: Seller
  ): Promise<void> {
    const product = await this.service.getOneProductByShopAndSeller(productId, shopId, seller.id);
    if (!product) throw new NotFoundException(`Product ${productId} not found`);
    await this.service.removeProduct(product);
  }
}
