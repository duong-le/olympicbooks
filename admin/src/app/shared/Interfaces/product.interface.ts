import { ProductStatus } from '../Enums/products.enum';
import { Attribute } from './attribute.interface';
import { Category } from './category.interface';

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  status: ProductStatus;
  images: ProductImage[];
  category: Category;
  attributes: Attribute[];
}

export interface ProductImage {
  id: number;
  imgUrl: string;
  imgName: string;
  productId: number;
}
