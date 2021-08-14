import { Product } from './product.interface';
import { Shipping } from './shipping.interface';
import { Transaction } from './transaction.interface';

export interface Order {
  id?: number;
  buyerNote?: string;
  sellerNote?: string;
  transaction?: Transaction;
  shipping?: Shipping;
  orderItems?: OrderItem[];
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  expanded?: Boolean;
}

export interface OrderItem {
  id?: number;
  quantity?: number;
  productId?: number;
  productTitle?: string;
  product?: Product;
  totalValue?: number;
}
