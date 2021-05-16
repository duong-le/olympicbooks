import { Product } from './product.interface';

export interface Cart {
  orderValue: number;
  totalShippingFee: number;
  totalQuantity: number;
  items: { [key: string]: CartItem[] };
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
