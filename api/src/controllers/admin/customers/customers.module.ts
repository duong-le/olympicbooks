import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { AdminCustomersController } from './customers.controller';

@Module({
  controllers: [AdminCustomersController],
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService]
})
export class AdminCustomersModule {}
