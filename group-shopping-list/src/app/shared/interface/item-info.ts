import { Product } from './product';

export interface ItemResponse {
  code: number;
  product: Product;
  status: number;
  status_verbose: string;
}
