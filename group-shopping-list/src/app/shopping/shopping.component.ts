import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { listOfItems } from '../shared/interface/page-request';
import { Product } from '../shared/interface/product';
import { ProductInfoService } from '../shared/services/product-info.service';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { listOfBrands } from '../shared/interface/list-of-brands';
import { ShoppingService } from '../shared/services/shopping.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as AOS from 'aos';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  showSpinner: boolean = false;
  durationInSeconds: number = 2;
  count: number;
  shoppingItems: Product[];
  brands: {}[] = [];
  pageSizeOptions: number[] = [5, 10, 15, 20, 25, 30, 50];
  pageSize: number = 10;
  page: number = 1;
  searchTerms: string = '';
  brand: string = 'Trader-joe-s';
  placeholderImage: string =
    'https://assets.materialup.com/uploads/b03b23aa-aa69-4657-aa5e-fa5fef2c76e8/preview.png';

  constructor(
    private shoppingListService: ShoppingListService,
    private productInfoService: ProductInfoService,
    private router: Router,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.searchForItems();
    if (this.shoppingService.listOfTop50Brands.length === 0) {
      this.productInfoService
        .getListOfTop50Brands()
        .subscribe((ListOfBrands: listOfBrands) => {
          this.shoppingService.listOfTop50Brands = ListOfBrands.tags.splice(
            0,
            50
          );
          this.brands = this.shoppingService.listOfTop50Brands;
        });
    } else {
      this.brands = this.shoppingService.listOfTop50Brands;
    }
  }
  addToShoppingList(item: Product) {
    this.shoppingListService.addToShoppingList(item);
  }
  searchForItems() {
    this.showSpinner = true;
    this.productInfoService
      .getListOfItems(this.searchTerms, this.brand, this.pageSize, this.page)
      .subscribe((listofItems: listOfItems) => {
        this.count = listofItems.count;
        this.shoppingItems = listofItems.products;
        this.showSpinner = false;
      });
  }
  openProduct(item: Product) {
    console.log(item);
    this.router.navigate([`product/nutrients/${item._id}`]);
  }
  pageEvent: PageEvent;
  onPageChange(event: PageEvent) {
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      this.page = 1;
      this.paginator.firstPage();
      this.searchForItems();
      return;
    }
    if (event.previousPageIndex > event.pageIndex) {
      this.page = this.page - 1;
      this.searchForItems();
    } else if (event.previousPageIndex < event.pageIndex) {
      this.page = this.page + 1;
      this.searchForItems();
    }
  }
  onChange() {
    this.page = 1;
    this.paginator.firstPage();
    this.searchForItems();
  }
}
