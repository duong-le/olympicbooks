import { TransactionMethod } from './transaction.interface';
import { ShippingMethod } from './shipping.interface';
import { Product } from './product.interface';

export interface Order {
  id?: number;
  state?: string;
  transaction?: {
    id?: number;
    transactionMethodId: TransactionMethod['id'];
    state?: string;
    value?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
  shipping?: {
    id?: number;
    address: string;
    shippingMethodId: ShippingMethod['id'];
    estimation?: Date;
  };
  orderItems?: OrderItem[];
  discount?: any;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  id?: number;
  quantity?: number;
  productId?: number;
  product?: Product;
  totalValue?: number;
}
