import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from './shared/services/auth/auth.service';
import { User } from './shared/services/auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'group-shopping-list';

  loggedIn: boolean = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      this.loggedIn = !!user;
    });
    AOS.init();
    this.authService.autoLogin();
  }
}
