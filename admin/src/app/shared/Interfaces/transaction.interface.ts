export interface Transaction {
  id?: number;
  transactionMethodId?: TransactionMethod['id'];
  transactionMethod?: TransactionMethod;
  state?: string;
  value?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionMethod {
  id: number;
  name: string;
  description: string;
  info: string;
  disabled: boolean;
}
