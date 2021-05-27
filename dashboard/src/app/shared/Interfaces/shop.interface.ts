import { ShopStatus } from '../Enums/shops.enum';
import { Order } from './order.interface';
import { Product } from './product.interface';
import { Seller } from './seller.interface';

export interface Shop {
  id: number;
  name: string;
  description: string;
  coverImgName: string;
  coverImgUrl: string;
  status: ShopStatus;
  sellers: Seller[];
  products: Product[];
  orders: Order[];
}
