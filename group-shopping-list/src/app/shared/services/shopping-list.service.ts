import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { flatMap, Subject } from 'rxjs';
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
    if (this.shoppingList.length === 0) {
      this.shoppingList.push(item);
      this.changeToShoppingList.next(1);
      this._snackBar.openFromComponent(PopUpComponent, {
        duration: 1500,
        data: {
          item: item,
        },
      });
      return;
    }
    let clear = true;
    this.shoppingList.forEach((i) => {
      if (i.code === item.code) {
        clear = false;
      }
    });
    if (clear) {
      this.shoppingList.push(item);
      this.changeToShoppingList.next(1);
      this._snackBar.openFromComponent(PopUpComponent, {
        duration: 1500,
        data: {
          item: item,
        },
      });
    } else {
      this._snackBar.openFromComponent(PopUpComponent, {
        duration: 3000,
        data: {
          message:
            'Already added to cart! Go to shopping list to edit quantity',
        },
      });
    }
    return;
  }
}
