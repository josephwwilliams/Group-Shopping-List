import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interface/product';
import { PopUpComponent } from 'src/app/shared/pop-up/pop-up.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {
  FormResponse,
  UserStorageService,
} from 'src/app/shared/services/auth/user-storage.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css'],
})
export class UserHomePageComponent implements OnInit {
  private userSub: Subscription;
  profileImg;
  calories: number;
  carbs: number;
  fats: number;
  proteins: number;
  loggedIn: boolean = false;
  userName: string;
  oldUser: boolean = true;
  shoppingList: Product[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userStorage: UserStorageService,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  date: string;

  ngOnInit(): void {
    AOS.init();
    this.userStorage.fetchUserFromFireBase().subscribe((userData: any) => {
      this.profileImg = userData.profileImg;
      this.userName = userData.firstName[0];
      this.date = userData.date;
      this.calories = userData.macros.calorie.toFixed(0);
      this.carbs = userData.macros.balanced.carbs.toFixed(0);
      this.fats = userData.macros.balanced.fat.toFixed(0);
      this.proteins = userData.macros.balanced.protein.toFixed(0);
      if (userData.shoppingList[0] === 0) {
        this.shoppingList = [];
      } else this.shoppingList = userData.shoppingList;
    });
  }
  openProduct(item: Product) {
    this.router.navigate([`product/nutrients/${item._id}`]);
  }
  copied() {
    this.shoppingListService.changeToShoppingList.next(
      this.shoppingList.length
    );
    this.shoppingListService.shoppingList = this.shoppingList;
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: 1500,
      data: {
        copied: 'Copied previous list!',
      },
    });
  }
}
