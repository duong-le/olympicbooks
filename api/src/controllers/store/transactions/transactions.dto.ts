import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum } from 'class-validator';

import { TransactionState } from '../../../shared/Enums/transaction-state.enum';

export class UpdateTransactionDto {
  @ApiPropertyOptional({ enum: TransactionState })
  @IsDefined()
  @IsEnum(TransactionState)
  state: TransactionState;
}
