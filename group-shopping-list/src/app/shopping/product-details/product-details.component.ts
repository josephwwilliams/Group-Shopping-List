import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemResponse } from '../../shared/interface/item-info';
import { Product } from '../../shared/interface/product';
import { ProductInfoService } from '../../shared/services/product-info.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  showSpinner: boolean = false;
  barcode: string = '';
  selectedItem: Product;
  images: string[] = [];

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {
          // if (ctx.chart.data.labels) {
          //   return ctx.chart.data.labels[ctx.dataIndex];
          // }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Carbs (g) '], ['Fats (g) '], ['Protein (g) ']],
    datasets: [
      {
        data: [3, 3, 3],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productInfoService: ProductInfoService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    AOS.init();
    if (!(this.route.snapshot.params['id'] === 'search')) {
      this.showSpinner = true;
      this.productInfoService
        .getItemInfo(this.route.snapshot.params['id'])
        .subscribe((infoItem: ItemResponse) => {
          this.barcode = this.route.snapshot.params['id'];
          this.selectedItem = infoItem.product;
          let dataSet = this.dataSet(infoItem);
          this.pieChartData.datasets = dataSet;
          this.images = [];
          if (infoItem.product.selected_images !== null || undefined) {
            this.images.push(
              infoItem.product.selected_images.front.display.en,
              infoItem.product.selected_images.nutrition.display.en,
              infoItem.product.selected_images.ingredients.display.en
            );
          }
          console.log(this.images);
          this.showSpinner = false;
        });
    }
    // this.getData().subscribe((res) => console.log(res));
  }
  getProductsByBarcode() {
    this.showSpinner = true;
    this.productInfoService
      .getItemInfo(this.barcode.toString())
      .subscribe((infoItem: ItemResponse) => {
        this.router.navigate([`product/nutrients/${this.barcode}`]);
        this.selectedItem = infoItem.product;
        let dataSet = this.dataSet(infoItem);
        this.pieChartData.datasets = dataSet;
        this.images = [];

        if (infoItem.product.selected_images !== null || undefined) {
          this.images.push(
            infoItem.product.selected_images.front.display.en,
            infoItem.product.selected_images.nutrition.display.en,
            infoItem.product.selected_images.ingredients.display.en
          );
        }
        this.showSpinner = false;
      });
  }

  addToShoppingList() {
    this.shoppingListService.addToShoppingList(this.selectedItem);
  }
  dataSet(infoItem: ItemResponse) {
    return [
      {
        data: [
          infoItem.product.nutriments.carbohydrates_serving,
          infoItem.product.nutriments.fat_serving,
          infoItem.product.nutriments.proteins_serving,
        ],
        backgroundColor: [
          'rgb(77, 130, 120, 0.5)',
          'rgb(164, 208, 175, 0.5)',
          'rgb(56, 73, 81, 0.5)',
        ],
        borderColor: ['white'],
        pointBackgroundColor: ['#4d8278', '#A4D0AF', '#384951'],
        pointBorderColor: ['#fff'],
        pointHoverBackgroundColor: ['#fff'],
        pointHoverBorderColor: ['#4d8278', '#A4D0AF', '#384951'],
        hoverBackgroundColor: ['#4d8278', '#A4D0AF', '#384951'],
        hoverBorderColor: ['#4d8278', '#A4D0AF', '#384951'],
      },
    ];
  }
}
