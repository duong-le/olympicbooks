import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TransactionMethod } from '../../../entities/transaction-methods.entity';
import { TransactionsService } from '../../../services/transactions.service';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
  constructor(public service: TransactionsService) {}

  @Get('/methods')
  getTransactionMethods(): Promise<TransactionMethod[]> {
    return this.service.getTransactionMethods();
  }
}
