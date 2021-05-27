import { ProductStatus } from '../Enums/products.enum';
import { Author } from './author.interface';
import { Category } from './category.interface';
import { Publisher } from './publisher.interface';

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
}

export interface ProductImage {
  id: number;
  imgUrl: string;
  imgName: string;
  productId: number;
}
