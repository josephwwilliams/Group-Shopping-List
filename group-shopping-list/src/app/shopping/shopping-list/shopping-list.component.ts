import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { Product } from 'src/app/shared/interface/product';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Product[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.shoppingList = this.shoppingListService.shoppingList;
  }

  RemoveFromShoppingList(item: Product, i: number) {
    this.shoppingListService.shoppingList.splice(i, 1);
    this.shoppingListService.changeToShoppingList.next(-1);
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: 1500,
      data: {
        removedItem: item,
      },
    });
  }
  openProduct(item: Product) {
    this.router.navigate([`product/nutrients/${item._id}`]);
  }
}
