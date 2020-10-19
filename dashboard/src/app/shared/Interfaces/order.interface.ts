import { TransactionMethod } from './transaction.interface';
import { ShippingMethod } from './shipping.interface';
import { Product } from './product.interface';

export interface Order {
  id?: number;
  transaction?: {
    id?: number;
    transactionMethodId?: TransactionMethod['id'];
    transactionMethod?: TransactionMethod;
    state?: string;
    value?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
  shipping?: {
    id?: number;
    state?: string;
    address?: string;
    phoneNumber?: string;
    shippingMethodId?: ShippingMethod['id'];
    shippingMethod?: ShippingMethod;
    deliveryDate?: Date;
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
