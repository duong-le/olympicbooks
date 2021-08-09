import { Product } from './product.interface';

export interface Cart {
  orderValue: number;
  shippingFee: number;
  quantity: number;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
