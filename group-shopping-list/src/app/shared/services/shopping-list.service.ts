import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { Product } from '../interface/product';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  changeToShoppingList = new Subject<any>();
  shoppingList: Product[] = [];
  constructor(private _snackBar: MatSnackBar) {}

  addToShoppingList(item: Product) {
    this.shoppingList.push(item);
    this.changeToShoppingList.next(1);
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: 1500,
      data: {
        item: item,
      },
    });
  }
}
