import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../../core/Decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/Guards/roles.guard';
import { TransactionMethod } from '../../../entities/transaction-methods.entity';
import { TransactionsService } from '../../../services/transactions.service';
import { UserType } from '../../../shared/Enums/users.enum';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.CUSTOMER)
export class TransactionsController {
  constructor(public service: TransactionsService) {}

  @Get('/methods')
  getTransactionMethods(): Promise<TransactionMethod[]> {
    return this.service.getTransactionMethods();
  }
}
