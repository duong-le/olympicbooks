import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { TransactionMethod } from '../controllers/transactions/transaction-methods.entity';
import { Transaction } from '../controllers/transactions/transactions.entity';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction> {
  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionMethod) private transactionMethodRepository: Repository<TransactionMethod>
  ) {
    super(transactionRepository);
  }

  async getTransactionMethods(): Promise<TransactionMethod[]> {
    return await this.transactionMethodRepository.createQueryBuilder('transaction-method').orderBy('id', 'ASC').getMany();
  }
}
