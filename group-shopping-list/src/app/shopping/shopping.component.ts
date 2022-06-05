import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { listOfItems } from '../shared/interface/page-request';
import { Product } from '../shared/interface/product';
import { ProductInfoService } from '../shared/services/product-info.service';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { listOfBrands } from '../shared/interface/list-of-brands';
import { ShoppingService } from '../shared/services/shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  showSpinner: boolean = false;
  durationInSeconds: number = 2;
  shoppingItems: Product[];
  brands: {}[] = [];
  pageSize: number = 25;
  page: number = 1;
  searchTerms: string = '';
  brand: string = '';

  constructor(
    private shoppingListService: ShoppingListService,
    private productInfoService: ProductInfoService,
    private router: Router,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
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
    } else this.brands = this.shoppingService.listOfTop50Brands;
  }
  addToShoppingList(item: Product) {
    this.shoppingListService.addToShoppingList(item);
  }
  searchForItems() {
    this.showSpinner = true;
    this.productInfoService
      .getListOfItems(this.searchTerms, this.brand, this.pageSize, this.page)
      .subscribe((res: listOfItems) => {
        this.shoppingItems = res.products;
        this.showSpinner = false;
      });
  }
  openProduct(item: Product) {
    this.router.navigate([`product/nutrients/${item._id}`]);
  }
}
