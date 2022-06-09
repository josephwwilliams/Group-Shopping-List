
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import * as AOS from 'aos';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',

  styleUrls: ['./auth.component.css'],

})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  isLoading = false;
  error: string = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] === 'signup') {
      this.isLoggedIn = false;
    } else if (this.route.snapshot.params['id'] === 'login') {
      this.isLoggedIn = true;
    }
    AOS.init();
  }

  onSwitch() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;


    let authObs: Observable<AuthResponseData>;


    this.isLoading = true;
    if (this.isLoggedIn) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;

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
