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

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  showSpinner: boolean = false;
  barcode: number;
  selectedItem: Product;
  data: [];

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
        data: [19, 10, 3],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productInfoService: ProductInfoService,
    private http: HttpClient,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    if (!(this.route.snapshot.params['id'] === 'search')) {
      this.showSpinner = true;
      this.productInfoService
        .getItemInfo(this.route.snapshot.params['id'])
        .subscribe((infoItem: ItemResponse) => {
          console.log(infoItem.product);
          this.barcode = this.route.snapshot.params['id'];
          this.selectedItem = infoItem.product;
          let dataSet = this.dataSet(infoItem);
          this.pieChartData.datasets = dataSet;
          this.showSpinner = false;
        });
    }
    // this.getData().subscribe((res) => console.log(res));
  }
  getProductsByBarcode() {
    this.showSpinner = true;
    this.productInfoService
      .getItemInfo(this.barcode)
      .subscribe((infoItem: ItemResponse) => {
        console.log(infoItem.product);
        this.router.navigate([`product/nutrients/${this.barcode}`]);
        this.selectedItem = infoItem.product;
        let dataSet = this.dataSet(infoItem);
        this.pieChartData.datasets = dataSet;
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
          'rgb(200, 184, 138, 0.5)',
          'rgb(241, 221, 223, 0.5)',
          'rgb(134, 176, 73, 0.5)',
        ],
        borderColor: ['white'],
        pointBackgroundColor: ['#C8B88A', '#F1DDDF', '#86B049'],
        pointBorderColor: ['#fff'],
        pointHoverBackgroundColor: ['#fff'],
        pointHoverBorderColor: ['#C8B88A', '#F1DDDF', '#86B049'],
        hoverBackgroundColor: ['#C8B88A', '#F1DDDF', '#86B049'],
        hoverBorderColor: ['#C8B88A', '#F1DDDF', '#86B049'],
      },
    ];
  }
}
