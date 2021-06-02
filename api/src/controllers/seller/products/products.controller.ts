import {
  BadRequestException,
  Controller,
  NotFoundException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { AttributeValue } from 'src/entities/attribute-value.entity';
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
import { ProductStatus } from '../../../shared/Enums/products.enum';
import { File } from '../../../shared/Interfaces/file.interface';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@ApiTags('Seller Shop Products')
@ApiBearerAuth()
@Controller('sellers/me/shops/:shopId/products')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Product },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase']
  },
  params: {
    shopId: {
      field: 'shopId',
      type: 'number'
    }
  },
  query: {
    join: {
      images: { eager: true },
      category: { eager: true },
      publisher: { eager: true },
      authors: { eager: true },
      shop: { eager: true },
      'shop.sellers': { eager: true, alias: 'seller', select: false }
    },
    exclude: ['categoryId', 'publisherId', 'shopId']
  },
  dto: { create: CreateProductDto, update: UpdateProductDto }
})
@CrudAuth({
  property: 'user',
  filter: (seller: Seller) => ({
    'seller.id': {
      $eq: seller.id
    }
  })
})
export class ShopProductsController implements CrudController<Product> {
  constructor(
    public service: ProductsService,
    public shopService: ShopsService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Publisher) private publisherRepository: Repository<Publisher>
  ) {}

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest): Promise<GetManyDefaultResponse<Product> | Product[]> {
    const products = await this.service.getMany(req);
    for (const product of Array.isArray(products) ? products : products.data) {
      product['attributes'] = await this.service.getProductAttributes(product.id, product.category.id);
    }
    return products;
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest): Promise<Product> {
    const product = await this.service.getOne(req);
    product['attributes'] = await this.service.getProductAttributes(product.id, product.category.id);
    return product;
  }

  @Override()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateProductDto,
    @UploadedFiles() uploadedFiles: File[],
    @UserInfo() seller: Seller
  ): Promise<Product> {
    const shopId = req.parsed.paramsFilter[0].value;
    const shop = await this.shopService.getOneShopBySeller(shopId, seller.id);
    if (!shop) throw new NotFoundException(`Shop ${shopId} not found`);

    const { authorIds, attributeValueIds, ...others } = dto;

    const product = this.productRepository.create({ ...others, shopId });
    product.authors = await this.authorRepository.findByIds(authorIds);
    product.attributeValues = await this.attributeValueRepository.findByIds(attributeValueIds);

    if (uploadedFiles?.length) {
      product.images = await this.service.createProductImages(uploadedFiles);
    }
    return await this.productRepository.save(product);
  }

  @Override()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachment', null, UploadOptions))
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateProductDto,
    @UploadedFiles() uploadedFiles: File[]
  ): Promise<Product> {
    const product = await this.service.getOne(req);
    if (!product) throw new NotFoundException('Product not found');

    const { status, categoryId, attributeValueIds, publisherId, authorIds, removedImageIds, ...others } = dto;

    if (status) {
      if (product.status === ProductStatus.BANNED)
        throw new BadRequestException('Seller cannot update status of banned product');
      else product.status = status;
    }

    if (categoryId && product?.category?.id !== categoryId) {
      product.category = await this.categoryRepository.findOne(categoryId);
    }

    if (authorIds?.length) {
      product.authors = await this.authorRepository.findByIds(authorIds);
    }

    if (publisherId && product?.publisher?.id !== publisherId) {
      product.publisher = await this.publisherRepository.findOne(publisherId);
    }

    if (attributeValueIds?.length) {
      product.attributeValues = await this.attributeValueRepository.findByIds(attributeValueIds);
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
}
