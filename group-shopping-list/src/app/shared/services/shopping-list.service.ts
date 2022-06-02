import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  shoppingList: Product[] = [];
  constructor() {}
}
