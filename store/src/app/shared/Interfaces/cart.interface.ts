import { Product } from './product.interface';
import { ShippingMethod } from './shipping.interface';
import { TransactionMethod } from './transaction.interface';

export interface Cart {
  orderValue: number;
  shippingFee: number;
  quantity: number;
  items: CartItem[];
  shippingMethods: ShippingMethod[];
  transactionMethods: TransactionMethod[];
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
