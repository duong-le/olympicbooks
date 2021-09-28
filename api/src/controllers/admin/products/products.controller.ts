import { Controller, NotFoundException, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Repository } from 'typeorm';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { UploadOptions } from '../../../core/Utils/cloud-storage.service';
import { SlugService } from '../../../core/Utils/slug.service';
import { AttributeValue } from '../../../entities/attribute-value.entity';
import { Category } from '../../../entities/categories.entity';
import { ProductImage } from '../../../entities/product-images.entity';
import { Product } from '../../../entities/products.entity';
import { ProductsService } from '../../../services/products.service';
import { UserType } from '../../../shared/Enums/users.enum';
import { File } from '../../../shared/Interfaces/file.interface';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@ApiTags('Admin Products')
@ApiBearerAuth()
@Controller('admin/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
@Crud({
  model: { type: Product },
  routes: {
    only: ['getManyBase', 'getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase']
  },
  query: {
    join: {
      images: { eager: true },
      category: { eager: true }
    },
    exclude: ['categoryId']
  },
  dto: { create: CreateProductDto, update: UpdateProductDto }
})
export class AdminProductsController implements CrudController<Product> {
  constructor(
    public service: ProductsService,
    public slugService: SlugService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>
  ) {}

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest): Promise<GetManyDefaultResponse<Product> | Product[]> {
    const products = await this.service.getMany(req);

    // In case pagination is enable, access the property `data` to achieve the data
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
    @UploadedFiles() uploadedFiles: File[]
  ): Promise<Product> {
    const { attributeValueIds, ...others } = dto;
    let product = this.productRepository.create(others);

    if (attributeValueIds?.length)
      product.attributeValues = await this.attributeValueRepository.findByIds(attributeValueIds);

    if (uploadedFiles?.length) {
      product.images = await this.service.createProductImages(uploadedFiles);
    }

    product = await this.productRepository.save(product);

    product.slug = this.slugService.createSlug(product.title, product.id);

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

    const { title, categoryId, attributeValueIds, removedImageIds, ...others } = dto;

    if (title) {
      product.title = title;
      product.slug = this.slugService.createSlug(product.title, product.id);
    }

    if (categoryId && product?.category?.id !== categoryId) {
      product.category = await this.categoryRepository.findOne(categoryId);
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
