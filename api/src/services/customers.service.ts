import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@rewiko/crud-typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import {
  AdminUpdateCustomerDto,
  CreateCustomerDto,
  UpdateCustomerDto
} from '../controllers/store/customers/customers.dto';
import { Customer } from '../entities/customers.entity';
import { AuthService } from './auth.service';

@Injectable()
export class CustomersService extends TypeOrmCrudService<Customer> {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    private authService: AuthService
  ) {
    super(customerRepository);
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const { name, email, password } = dto;
    const hashedPassword = this.authService.hashPassword(password);
    const customer = this.customerRepository.save({ name, email, hashedPassword });
    return plainToInstance(Customer, customer);
  }

  async updateCustomer(id: number, dto: AdminUpdateCustomerDto | UpdateCustomerDto): Promise<Customer> {
    let hashedPassword: string;
    const { password, ...others } = dto;

    const customer = await this.customerRepository.findOne(id);
    if (!customer) throw new BadRequestException(`Customer ${id} not found`);

    if (password) hashedPassword = this.authService.hashPassword(dto.password);

    const updatedCustomer = await this.customerRepository.save({
      ...customer,
      ...others,
      ...(password && { hashedPassword })
    });

    return plainToInstance(Customer, updatedCustomer);
  }
}
