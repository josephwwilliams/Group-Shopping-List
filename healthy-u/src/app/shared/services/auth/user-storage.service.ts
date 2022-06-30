import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { Product } from '../../interface/product';
import { MacroCalculatorService } from '../macro-calculator.service';
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
    feet: number;
    inches: number;
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
export interface MacroResponse {
  data: {
    balanced: {
      carbs: number;
      fat: number;
      protein: number;
    };
    calorie: number;
    highprotein: {
      carbs: number;
      fat: number;
      protein: number;
    };
    lowcarbs: {
      carbs: number;
      fat: number;
      protein: number;
    };
    lowfat: {
      carbs: number;
      fat: number;
      protein: number;
    };
    request_result: string;
    status_code: number;
  };
}
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  currentUser: FormResponse;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shoppingListService: ShoppingListService,
    private macroService: MacroCalculatorService
  ) {}
  addUserToFireBase(form: FormResponse, macros: MacroResponse) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userData = {
          email: [form[3].email],
          goal: [form[0].goal],
          firstName: [form[1].firstName],
          lastName: [form[1].lastName],
          age: [form[2].age],
          feet: [form[2].feet],
          inches: [form[2].inches],
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
          macros: macros.data,
          profileImg: 'none',
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

  saveProfilePicture(profileImg: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let image = JSON.stringify(profileImg);
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}/profileImg.json`,
          image
        );
      })
    );
  }

  changeGender(gender: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}/gender.json`,
          [gender]
        );
      })
    );
  }

  changeFirstName(firstName: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}/firstName.json`,
          [firstName]
        );
      })
    );
  }

  changeLastName(lastName: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}/lastName.json`,
          [lastName]
        );
      })
    );
  }

  storeFoodLog() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userEmail = user.email.replace('@', '').replace('.', '');
        let date = new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
        let alteredDate = date.replace('/', '-').replace('/', '-');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}/foodLog/${alteredDate}.json`,
          this.macroService.foodLog
        );
      })
    );
  }
}
