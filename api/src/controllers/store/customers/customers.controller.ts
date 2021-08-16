import { BadRequestException, Body, ConflictException, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { UserInfo } from '../../../core/Decorators/user-info.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { UserType } from '../../../shared/Enums/users.enum';
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
      throw error.code === '23505'
        ? new ConflictException('Email already exists')
        : new BadRequestException(error?.message);
    }
  }

  @ApiOperation({ summary: 'Retrieve a single Customer' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  @Get('me')
  getCustomer(@UserInfo() customer: Customer): Customer {
    return customer;
  }

  @ApiOperation({ summary: 'Update a single Customer' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  @Patch('me')
  async updateCustomer(@Body() dto: UpdateCustomerDto, @UserInfo() customer: Customer): Promise<Customer> {
    try {
      return await this.service.updateCustomer(customer.id, dto);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Email already exists')
        : new BadRequestException(error?.message);
    }
  }
}
