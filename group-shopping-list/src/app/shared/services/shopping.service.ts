import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  listOfTop50Brands: {}[] = [];
  constructor() {}
}
