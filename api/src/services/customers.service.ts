import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto, UpdateMeDto } from '../controllers/store/customers/customers.dto';
import { Customer } from '../entities/customers.entity';
import { AuthService } from './auth.service';

@Injectable()
export class CustomersService extends TypeOrmCrudService<Customer> {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>, private authService: AuthService) {
    super(customerRepository);
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const { name, email, password } = dto;
    const hashedPassword = this.authService.hashPassword(password);
    try {
      return await this.customerRepository.save({ name, email, hashedPassword });
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }

  async updateCustomer(id: number, dto: UpdateCustomerDto | UpdateMeDto): Promise<Customer> {
    let hashedPassword: string;
    const { password, ...others } = dto;
    const customer = await this.customerRepository.findOne(id);
    if (!customer) throw new BadRequestException(`Customer ${id} not found`);
    if (password) hashedPassword = this.authService.hashPassword(dto.password);
    try {
      return await this.customerRepository.save({ ...customer, ...others, ...(password && { hashedPassword }) });
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }
}
