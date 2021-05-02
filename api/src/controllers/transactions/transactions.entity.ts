import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../core/Entities/base.entity';
import { TransactionState } from '../../shared/Enums/transaction-state.enum';
import { TransactionMethod } from './transaction-methods.entity';

@Entity()
export class Transaction extends BaseEntity {
  @Column()
  transactionMethodId: number;

  @Column({ enum: TransactionState, default: TransactionState.PENDING })
  state: TransactionState;

  @Column()
  value: number;

  @ManyToOne(() => TransactionMethod, (transactionMethod) => transactionMethod.transactions)
  transactionMethod: TransactionMethod;
}
