import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { Product } from 'src/app/shared/interface/product';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
})
export class UserHomePageComponent implements OnInit {
  oldUser: boolean = true;
  shoppingList: Product[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  date: string;

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.shoppingList;
    AOS.init();
    this.date = new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  openProduct(item: Product) {
    this.router.navigate([`product/nutrients/${item._id}`]);
  }
  copied() {
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: 1500,
      data: {
        copied: 'Copied previous list!',
      },
    });
  }
}
