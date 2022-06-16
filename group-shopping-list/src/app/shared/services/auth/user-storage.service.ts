import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import { AuthService } from './auth.service';

export interface FormResponse {
  0: {
    goal: string;
  };
  1: {
    firstName: string;
    lastName: string;
  };
  2: {
    age: number;
    height: number;
    weight: number;
    activity: number;
    gender: string;
  };
  3: {
    email: string;
    password: string;
  };
  date: string;
  shoppingList: [];
}

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  currentUser: FormResponse;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shoppingListService: ShoppingListService
  ) {}
  addUserToFireBase(form: FormResponse) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userData = {
          email: [form[3].email],
          goal: [form[0].goal],
          firstName: [form[1].firstName],
          lastName: [form[1].lastName],
          age: [form[2].age],
          height: [form[2].height],
          weight: [form[2].weight],
          activity: [form[2].activity],
          gender: [form[2].gender],
          date: new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          shoppingList: [0],
        };
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}.json`,
          userData
        );
      })
    );
  }

  fetchUserFromFireBase() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.get(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}.json`
        );
      })
    );
  }

  storeFavoritesToFireBase() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}/shoppingList.json`,
          this.shoppingListService.shoppingList
        );
      })
    );
  }
}
