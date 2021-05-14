import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shop } from '../entities/shops.entity';
import { File } from '../shared/Interfaces/file.interface';
import { CloudStorageService } from './cloud-storage.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
    private cloudStorageService: CloudStorageService
  ) {}

  async getManyShops(sellerId: number): Promise<Shop[]> {
    return await this.shopRepository
      .createQueryBuilder('shop')
      .innerJoin('shop.sellers', 'seller')
      .where('seller.id = :sellerId', { sellerId })
      .getMany();
  }

  async getOneShop(shopId: number, sellerId: number): Promise<Shop> {
    return await this.shopRepository
      .createQueryBuilder('shop')
      .innerJoin('shop.sellers', 'seller')
      .where('seller.id = :sellerId', { sellerId })
      .andWhere('shop.id = :shopId', { shopId })
      .getOne();
  }

  async uploadFile(uploadedFile: File): Promise<any> {
    return await this.cloudStorageService.uploadFile(uploadedFile, '/shops');
  }

  async removeFile(fileName: string): Promise<void> {
    await this.cloudStorageService.removeFile(fileName);
  }
}
