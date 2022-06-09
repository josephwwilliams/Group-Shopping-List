import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'group-shopping-list';
  show = false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    AOS.init();
    this.authService.autoLogin();
  }
}
