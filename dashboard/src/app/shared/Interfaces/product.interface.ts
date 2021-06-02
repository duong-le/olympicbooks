import { ProductStatus } from '../Enums/products.enum';
import { Attribute } from './attribute.interface';
import { Category } from './category.interface';
import { Shop } from './shop.interface';

export interface Product {
  id: number;
  title: string;
  description: string;
  publicationYear: number;
  pages: number;
  weight: number;
  price: number;
  originalPrice: number;
  status: ProductStatus;
  images: ProductImage[];
  category: Category;
  shop: Shop;
  attributes: Attribute[];
}

export interface ProductImage {
  id: number;
  imgUrl: string;
  imgName: string;
  productId: number;
}
