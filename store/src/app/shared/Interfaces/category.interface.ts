export interface Category {
  id: number;
  title: string;
  slug: string;
  imgUrl: string;
  imgName: string;
  key: string;
  parents?: Category[];
  children?: Category[];
  isLeaf: boolean;
}
