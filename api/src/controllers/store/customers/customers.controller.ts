import { BadRequestException, Body, ConflictException, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CustomerInfo } from '../../../core/Decorators/customer-info.decorator';
import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(public service: CustomersService) {}

  @ApiOperation({ summary: 'Create a single Customer' })
  @Post()
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.service.createCustomer(dto);
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Retrieve a single Customer' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  getCustomer(@CustomerInfo() customer: Customer): Customer {
    return customer;
  }

  @ApiOperation({ summary: 'Update a single Customer' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Patch('me')
  async updateCustomer(@Body() dto: UpdateCustomerDto, @CustomerInfo() customer: Customer): Promise<Customer> {
    try {
      return await this.service.updateCustomer(customer.id, dto);
    } catch (error) {
      throw error.code === '23505' ? new ConflictException('Email already exists') : new BadRequestException(error?.message);
    }
  }
}
