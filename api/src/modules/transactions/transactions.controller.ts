import { Controller, UseGuards, UseInterceptors, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Transaction } from './transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionMethod } from './transaction-methods.entity';
import { Roles } from 'src/shared/Decorators/roles.decorator';
import { Role } from 'src/shared/Enums/roles.enum';

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
