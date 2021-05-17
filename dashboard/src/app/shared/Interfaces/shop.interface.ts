import { Order } from './order.interface';
import { Product } from './product.interface';
import { Seller } from './seller.interface';

export interface Shop {
  id: number;
  description: string;
  coverImgName: string;
  coverImgUrl: string;
  isApproved: boolean;
  sellers: Seller[];
  products: Product[];
  orders: Order[];
}
