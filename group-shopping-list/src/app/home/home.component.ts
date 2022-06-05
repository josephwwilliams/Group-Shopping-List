import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductInfoService } from '../shared/services/product-info.service';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'group-shopping-list';
  constructor() {}
  ngOnInit(): void {}
}
