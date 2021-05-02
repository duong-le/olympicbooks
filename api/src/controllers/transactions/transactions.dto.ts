import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsEnum } from 'class-validator';
import { TransactionState } from '../../shared/Enums/transaction-state.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  transactionMethodId: number;
}

export class UpdateTransactionDto {
  @ApiPropertyOptional({ enum: TransactionState })
  @IsDefined()
  @IsEnum(TransactionState)
  state: TransactionState;
}
