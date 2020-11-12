import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../shared/Entities/base.entity';
import { Transaction } from './transactions.entity';

@Entity()
export class TransactionMethod extends BaseEntity {
  @Column({ default: null })
  name: string;

  @Column()
  description: string;

  @Column({ default: null })
  info: string;

  @Column()
  disabled: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.transactionMethod)
  transactions: Transaction[];
}
