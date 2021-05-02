import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';

import { Roles } from '../../core/Decorators/roles.decorator';
import { TransactionMethod } from '../../entities/transaction-methods.entity';
import { Transaction } from '../../entities/transactions.entity';
import { TransactionsService } from '../../services/transactions.service';
import { Role } from '../../shared/Enums/roles.enum';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(AuthGuard())
@Crud({
  model: { type: Transaction },
  routes: {
    only: ['getOneBase', 'getManyBase'],
    getOneBase: { decorators: [Roles(Role.ADMIN)] },
    getManyBase: { decorators: [Roles(Role.ADMIN)] }
  }
})
export class TransactionsController implements CrudController<Transaction> {
  constructor(public service: TransactionsService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/methods')
  getTransactionMethods(): Promise<TransactionMethod[]> {
    return this.service.getTransactionMethods();
  }
}
