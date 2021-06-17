import { Product } from './product.interface';
import { Shipping } from './shipping.interface';
import { Shop } from './shop.interface';
import { Transaction } from './transaction.interface';

export interface Order {
  id?: number;
  buyerNote?: string;
  sellerNote?: string;
  transaction?: Transaction;
  shipping?: Shipping;
  orderItems?: OrderItem[];
  shop: Shop;
  discount?: any;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  id?: number;
  quantity?: number;
  productId?: number;
  productTitle?: string;
  product?: Product;
  totalValue?: number;
}
