import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '../../../entities/customers.entity';
import { CustomersService } from '../../../services/customers.service';
import { CustomersController } from './customers.controller';

@Module({
  controllers: [CustomersController],
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService]
})
export class CustomersModule {}
