import { Module } from '@nestjs/common';

import { CustomersModule } from '../../store/customers/customers.module';
import { AdminCustomersController } from './customers.controller';

@Module({
  controllers: [AdminCustomersController],
  imports: [CustomersModule]
})
export class AdminCustomersModule {}
