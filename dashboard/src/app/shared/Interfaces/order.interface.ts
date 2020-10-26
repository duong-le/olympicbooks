import { Transaction } from './transaction.interface';
import { Shipping } from './shipping.interface';
import { Product } from './product.interface';

export interface Order {
  id?: number;
  buyerNote?: string;
  sellerNote?: string;
  transaction?: Transaction;
  shipping?: Shipping;
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
