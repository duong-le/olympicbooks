import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TransactionMethod } from './transaction-methods.entity';
import { TransactionState } from 'src/shared/Enums/transaction-state.enum';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionMethodId: number;

  @Column({ enum: TransactionState, default: TransactionState.PENDING })
  state: TransactionState;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TransactionMethod, (transactionMethod) => transactionMethod.method)
  transactionMethod: TransactionMethod;
}
