import { CartItem } from './cart.interface';

export interface Customer {
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  isBlock?: boolean;
  role?: number;
  cartItems?: CartItem[];
}
