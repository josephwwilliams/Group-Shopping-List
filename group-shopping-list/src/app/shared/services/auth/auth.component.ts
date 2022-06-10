import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import * as AOS from 'aos';
import { UserStorageService } from './user-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',

  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] === 'signup') {
      this.isLoginMode = false;
    } else if (this.route.snapshot.params['id'] === 'login') {
      this.isLoginMode = true;
    }
    AOS.init();
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.authService.form = form.value;
    console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        if (!this.isLoginMode) {
          this.userStorageService
            .addUserToFireBase(this.authService.form)
            .subscribe((res) => {
              console.log(this.authService.form);
            });
        }
        this.router.navigate(['']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
