import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsService } from '../../services/transactions.service';
import { TransactionMethod } from './transaction-methods.entity';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transactions.entity';

@Module({
  controllers: [TransactionsController],
  imports: [TypeOrmModule.forFeature([Transaction, TransactionMethod])],
  providers: [TransactionsService]
})
export class TransactionsModule {}
