import { Author } from './author.interface';
import { Category } from './category.interface';
import { Publisher } from './publisher.interface';
import { Shop } from './shop.interface';

export interface Product {
  id: number;
  title: string;
  publicationYear: number;
  pages: number;
  weight: number;
  price: number;
  originalPrice: number;
  images: ProductImage[];
  description: string;
  category: Category;
  publisher: Publisher;
  authors: Author[];
  inStock: boolean;
  shop: Shop;
}

export interface ProductImage {
  id: number;
  imgUrl: string;
  imgName: string;
}
