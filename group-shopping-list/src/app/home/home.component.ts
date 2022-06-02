import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { listOfItems } from '../shared/page-request';
import { PopUpComponent } from '../shared/pop-up/pop-up.component';
import { Product } from '../shared/product';
import { ProductInfoService } from '../shared/services/product-info.service';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'group-shopping-list';
  showSpinner: boolean = false;
  durationInSeconds: number = 2;
  shoppingItems: Product[];
  pageSize: number = 25;
  page: number = 1;
  searchTerms: string = '';

  constructor(
    private shoppingListService: ShoppingListService,
    private _snackBar: MatSnackBar,
    private productInfoService: ProductInfoService
  ) {}
  ngOnInit(): void {}

  searchForItems() {
    this.showSpinner = true;
    this.productInfoService
      .getListOfItems(this.searchTerms, this.pageSize, this.page)
      .subscribe((res: listOfItems) => {
        this.shoppingItems = res.products;
        this.showSpinner = false;
      });
  }
  addToShoppingList(item: Product) {
    this.shoppingListService.shoppingList.push(item);
    console.log(item);
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: 1500,
      data: {
        item: item,
      },
    });
  }
}
