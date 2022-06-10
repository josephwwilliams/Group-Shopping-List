import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  addUserToFireBase(form: any) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let userData = {
          message: 'hi',
          email: form.email,
        };
        let userEmail = user.email.replace('@', '').replace('.', '');
        return this.http.put(
          `https://life-tracker-app-869c1-default-rtdb.firebaseio.com/users/${userEmail}.json`,
          userData
        );
      })
    );
  }
}
