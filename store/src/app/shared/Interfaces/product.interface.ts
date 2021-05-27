import { ProductStatus } from '../Enums/products.enum';
import { Author } from './author.interface';
import { Category } from './category.interface';
import { Publisher } from './publisher.interface';
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
  publisher: Publisher;
  authors: Author[];
  shop: Shop;
}

export interface ProductImage {
  id: number;
  imgUrl: string;
  imgName: string;
}
