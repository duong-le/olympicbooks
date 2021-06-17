import { Attribute } from './attribute.interface';

export interface Category {
  id: number;
  title: string;
  imgUrl: string;
  imgName: string;
  key: string;
  parents?: Category[];
  children?: Category[];
  isLeaf: boolean;
  attributes: Attribute[];
}
