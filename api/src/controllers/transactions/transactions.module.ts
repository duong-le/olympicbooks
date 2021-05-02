import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionMethod } from './transaction-methods.entity';

@Module({
  controllers: [TransactionsController],
  imports: [TypeOrmModule.forFeature([Transaction, TransactionMethod])],
  providers: [TransactionsService]
})
export class TransactionsModule {}
