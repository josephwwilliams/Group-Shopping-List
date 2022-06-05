import { Product } from './product';

export interface listOfItems {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: Product[];
  skip: number;
}
