export interface Category {
  id: number;
  title: string;
  img: string;
  key: string;
  parent: Category;
  children: Category[];
  isLeaf: boolean;
}
