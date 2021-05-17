import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { CreateSellerDto, UpdateSellerDto } from '../controllers/seller/sellers/sellers.dto';
import { Seller } from '../entities/sellers.entity';
import { AuthService } from './auth.service';

@Injectable()
export class SellersService extends TypeOrmCrudService<Seller> {
  constructor(
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
    private authService: AuthService
  ) {
    super(sellerRepository);
  }

  async createSeller(dto: CreateSellerDto): Promise<Seller> {
    const { name, email, password } = dto;
    const hashedPassword = this.authService.hashPassword(password);

    return this.sellerRepository.save({ name, email, hashedPassword });
  }

  async updateSeller(seller: Seller, dto: UpdateSellerDto): Promise<Seller> {
    const { password, ...others } = dto;
    if (password) seller.hashedPassword = this.authService.hashPassword(dto.password);

    return await this.sellerRepository.save({ ...seller, ...others });
  }
}
