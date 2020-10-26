import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transactions.entity';

@Entity()
export class TransactionMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
