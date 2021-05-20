import { Shop } from './shop.interface';

export interface Seller {
  id?: number;
  name?: string;
  email?: string;
  isBlock?: boolean;
  shops?: Shop[];
}
