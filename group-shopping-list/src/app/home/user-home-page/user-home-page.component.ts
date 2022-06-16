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
  loggedIn: boolean = false;
  userName: string;
  oldUser: boolean = true;
  shoppingList: Product[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userStorage: UserStorageService,
    private authService: AuthService
  ) {}
  date: string;

  ngOnInit(): void {
    AOS.init();
    this.userStorage.fetchUserFromFireBase().subscribe((userData: any) => {
      console.log(userData);
      this.userName = userData.firstName[0];
      this.date = userData.date;
      if (userData.shoppingList[0] === 0) {
        this.shoppingList = [];
      } else this.shoppingList = userData.shoppingList;
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
