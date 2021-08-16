import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Attribute } from 'src/entities/attribute.entity';
import { Repository } from 'typeorm';

import { CloudStorageService } from '../core/Utils/cloud-storage.service';
import { CartItem } from '../entities/carts.entity';
import { OrderItem } from '../entities/orders-item.entity';
import { ProductImage } from '../entities/product-images.entity';
import { Product } from '../entities/products.entity';
import { ProductStatus } from '../shared/Enums/products.enum';
import { File } from '../shared/Interfaces/file.interface';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Attribute) private attribute: Repository<Attribute>,
    private cloudStorageService: CloudStorageService
  ) {
    super(productRepository);
  }

  async getTopSellingProducts(limit: number): Promise<Product[]> {
    const products = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .select('orderItem.productId, SUM(orderItem.quantity)')
      .groupBy('orderItem.productId')
      .orderBy('SUM(orderItem.quantity)', 'DESC')
      .leftJoin('orderItem.product', 'product')
      .andWhere('product.status = :productStatus', { productStatus: ProductStatus.ACTIVE })
      .limit(limit)
      .getRawMany();
    const productIds = products.map((product) => product.productId);
    return await this.productRepository.findByIds(productIds);
  }

  async removeProduct(product: Product): Promise<void> {
    // await this.service.removeFiles(product.images);
    await this.productImageRepository.softRemove(product.images);
    await this.productRepository.softDelete(product.id);
    await this.cartItemRepository.delete({ productId: product.id });
  }

  async createProductImages(uploadedFiles: File[]): Promise<ProductImage[]> {
    const images: ProductImage[] = [];
    const files = await this.uploadProductImages(uploadedFiles);
    files.forEach((file: any) => {
      const productImage = this.productImageRepository.create({
        imgUrl: file.publicUrl,
        imgName: file.name
      });
      images.push(productImage);
    });
    return images;
  }

  private async uploadProductImages(uploadedFiles: File[]): Promise<any> {
    const files = [];
    for (const file of uploadedFiles)
      files.push(await this.cloudStorageService.uploadFile(file, '/products'));
    return files;
  }

  async removeProductImages(images: ProductImage[]): Promise<void> {
    for (const image of images) {
      await this.cloudStorageService.removeFile(image.imgName);
    }
  }

  async getProductAttributes(productId: number, categoryId: number): Promise<Attribute[]> {
    return await this.attribute
      .createQueryBuilder('attribute')
      .leftJoinAndSelect('attribute.attributeValues', 'attributeValue')
      .leftJoin('attributeValue.products', 'product')
      .where('attribute.categoryId = :categoryId', { categoryId })
      .andWhere('product.id = :productId', { productId })
      .getMany();
  }
}
