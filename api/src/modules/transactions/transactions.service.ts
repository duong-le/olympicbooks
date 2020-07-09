import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Transaction } from './transactions.entity';
import { TransactionMethod } from './transaction-methods.entity';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction> {
  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionMethod) private transactionMethodRepository: Repository<TransactionMethod>
  ) {
    super(transactionRepository);
  }

  async getTransactionMethods(): Promise<TransactionMethod[]> {
    return this.transactionMethodRepository.find();
  }
}
