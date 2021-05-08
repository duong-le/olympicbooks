import { Body, Controller, Get, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor, Override, ParsedBody } from '@nestjsx/crud';
import { plainToClass } from 'class-transformer';

import { CustomerInfo } from '../../../core/Decorators/customer-info.decorator';
import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto, UpdateMeDto } from './customers.dto';

@ApiTags('Customers')
@Controller('customers')
@Crud({
  model: { type: Customer },
  routes: {
    only: ['createOneBase']
  },
  dto: { create: CreateCustomerDto, update: UpdateCustomerDto }
})
export class CustomersController implements CrudController<Customer> {
  constructor(public service: CustomersService) {}

  @ApiOperation({ summary: 'Retrieve my Customer' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(CrudRequestInterceptor)
  @Get('me')
  getMe(@CustomerInfo() customer: Customer): Customer {
    return customer;
  }

  @ApiOperation({ summary: 'Update my Customer' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(CrudRequestInterceptor)
  @Patch('me')
  async updateMe(@Body() me: UpdateMeDto, @CustomerInfo() customer: Customer): Promise<Customer> {
    const updatedCustomer = await this.service.updateCustomer(customer.id, me);
    return plainToClass(Customer, updatedCustomer);
  }

  @Override()
  createOne(@ParsedBody() dto: CreateCustomerDto): Promise<Customer> {
    return this.service.createCustomer(dto);
  }
}
