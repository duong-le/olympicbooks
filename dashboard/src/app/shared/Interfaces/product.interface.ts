import { Category } from './category.interface';
import { Publisher } from './publisher.interface';
import { Author } from './author.interface';

export interface Product {
  id: number;
  title: string;
  publicationYear: number;
  pages: number;
  price: number;
  originalPrice: number;
  images: ProductImage[];
  description: string;
  category: Category;
  publisher: Publisher;
  authors: Author[];
  stock: number;
}

export interface ProductImage {
  id: number;
  url: string;
}
