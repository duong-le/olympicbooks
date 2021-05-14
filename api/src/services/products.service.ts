import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { CartItem } from '../entities/carts.entity';
import { OrderItem } from '../entities/orders-item.entity';
import { ProductImage } from '../entities/product-images.entity';
import { Product } from '../entities/products.entity';
import { File } from '../shared/Interfaces/file.interface';
import { CategoriesService } from './categories.service';
import { CloudStorageService } from './cloud-storage.service';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
    private categoriesService: CategoriesService,
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
      .where('product.inStock = :inStock', { inStock: true })
      .limit(limit)
      .getRawMany();
    const productIds = products.map((product) => product.productId);
    return await this.productRepository.findByIds(productIds);
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    if (product?.category?.id) product.category = await this.categoriesService.getOne(product?.category?.id);
    return product;
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
}
