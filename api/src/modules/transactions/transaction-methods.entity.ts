import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transactions.entity';

@Entity()
export class TransactionMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  description: string;

  @Column()
  disabled: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.transactionMethod)
  transactions: Transaction[];
}
