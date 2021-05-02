import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionMethod } from '../../entities/transaction-methods.entity';
import { Transaction } from '../../entities/transactions.entity';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  imports: [TypeOrmModule.forFeature([Transaction, TransactionMethod])],
  providers: [TransactionsService]
})
export class TransactionsModule {}
