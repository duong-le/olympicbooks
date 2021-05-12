import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateSellerDto, UpdateSellerDto } from '../controllers/seller/sellers/sellers.dto';
import { Seller } from '../entities/sellers.entity';
import { AuthService } from './auth.service';

@Injectable()
export class SellersService {
  constructor(@InjectRepository(Seller) private sellerRepository: Repository<Seller>, private authService: AuthService) {}

  async createSeller(dto: CreateSellerDto): Promise<Seller> {
    const { name, email, password } = dto;
    const hashedPassword = this.authService.hashPassword(password);
    const seller = await this.sellerRepository.save({ name, email, hashedPassword });
    return plainToClass(Seller, seller);
  }

  async updateSeller(id: number, dto: UpdateSellerDto): Promise<Seller> {
    let hashedPassword: string;
    const { password, ...others } = dto;
    const seller = await this.sellerRepository.findOne(id);
    if (!seller) throw new BadRequestException(`seller ${id} not found`);
    if (password) hashedPassword = this.authService.hashPassword(dto.password);
    const updatedSeller = await this.sellerRepository.save({ ...seller, ...others, ...(password && { hashedPassword }) });
    return plainToClass(Seller, updatedSeller);
  }
}
