import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Product } from './products.entity';
import { ProductImage } from './product-images.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { File } from 'src/shared/Interfaces/file.interface';
import { Category } from '../categories/categories.entity';
import { Author } from '../authors/authors.entity';
import { Publisher } from '../publishers/publishers.entity';
import { CloudStorageService } from 'src/shared/Services/cloud-storage.service';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Publisher) private publisherRepository: Repository<Publisher>,
    private cloudStorageService: CloudStorageService
  ) {
    super(productRepository);
  }

  async createProduct(dto: CreateProductDto, uploadedFiles: File[]): Promise<Product> {
    const { authorIds, ...others } = dto;

    const product = this.productRepository.create(others);
    product.authors = await this.authorRepository.findByIds(authorIds);

    if (uploadedFiles.length) {
      const files = await this.uploadFiles(uploadedFiles);
      product.images = [];
      files.forEach((file: any) => {
        const productImage = this.productImageRepository.create({ imgUrl: file.publicUrl, imgName: file.name });
        product.images.push(productImage);
      });
    }
    return await this.productRepository.save(product);
  }

  async updateProduct(id: number, dto: UpdateProductDto, uploadedFiles: File[]): Promise<Product> {
    const { authorIds, removedImageIds, ...others } = dto;

    const product = await this.productRepository.findOne(id);

    if (dto.categoryId && product.category.id !== dto.categoryId) {
      product.category = await this.categoryRepository.findOne(dto.categoryId);
    }

    if (authorIds?.length) {
      product.authors = await this.authorRepository.findByIds(authorIds);
    }

    if (dto.publisherId && product.publisher.id !== dto.publisherId) {
      product.publisher = await this.publisherRepository.findOne(dto.publisherId);
    }

    if (uploadedFiles.length) {
      const files = await this.uploadFiles(uploadedFiles);
      files.forEach((file: any) => {
        const productImage = this.productImageRepository.create({ imgUrl: file.publicUrl, imgName: file.name, product });
        product.images.push(productImage);
      });
    }

    if (removedImageIds?.length) {
      product.images = product.images.filter((image) => !removedImageIds.includes(image.id));
      await this.removeFiles(await this.productImageRepository.findByIds(removedImageIds));
      await this.productImageRepository.delete(removedImageIds);
    }
    return await this.productRepository.save({ ...product, ...others });
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    await this.removeFiles(product.images);
    await this.productRepository.delete(id);
  }

  async uploadFiles(uploadedFiles: File[]): Promise<any> {
    const files = [];
    for (const file of uploadedFiles) files.push(await this.cloudStorageService.uploadFile(file, '/products'));
    return files;
  }

  async removeFiles(images: ProductImage[]): Promise<void> {
    for (const image of images) {
      await this.cloudStorageService.removeFile(image.imgName);
    }
  }
}
