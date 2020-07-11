import { Product } from './product.interface';

export interface Cart {
  totalQty?: number;
  totalValue?: number;
  discountValue?: number;
  shippingValue?: number;
  cartItems?: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
