import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as AOS from 'aos';
import { interval } from 'rxjs';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Product } from '../shared/interface/product';
import { AuthService } from '../shared/services/auth/auth.service';
import { User } from '../shared/services/auth/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedIn: boolean = false;
  pieChartDisplayProduct: string = 'Nutella hazelnut spread (Per Serving)';
  current: number = 0;
  shoppingList: Product[] = [];
  title = 'group-shopping-list';
  constructor(
    private shoppingListService: ShoppingListService,
    private authService: AuthService
  ) {}
  foodImages: string[] = [
    'https://images.pexels.com/photos/1985775/pexels-photo-1985775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1346295/pexels-photo-1346295.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1563636/pexels-photo-1563636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1660037/pexels-photo-1660037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1765597/pexels-photo-1765597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1580464/pexels-photo-1580464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1682453/pexels-photo-1682453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ];
  workoutImages: string[] = [
    'https://images.pexels.com/photos/949129/pexels-photo-949129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/897064/pexels-photo-897064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/703014/pexels-photo-703014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6039243/pexels-photo-6039243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4754008/pexels-photo-4754008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6456144/pexels-photo-6456144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6454060/pexels-photo-6454060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];
  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      this.loggedIn = !!user;
    });
    AOS.init();
    let dataSet = this.dataSet();

    this.pieChartData.datasets = dataSet;
    this.shoppingList = this.shoppingListService.shoppingList;
    interval(7000).subscribe(() => {
      if (this.current > 2) {
        this.current = 0;
      }
      this.pieChartData.datasets = this.dataSets[this.current];
      this.pieChartDisplayProduct = this.pieChartProducts[this.current];
      this.current += 1;
      this.chart?.update();
    });
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {},
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Carbs (g) '], ['Fats (g) '], ['Proteins (g) ']],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  dataSet() {
    return [
      {
        data: [23, 12, 2],
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
  dataSets = [
    [
      {
        data: [24, 3, 2],
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
    ],
    [
      {
        data: [7, 15, 7],
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
    ],
    [
      {
        data: [23, 12, 2],
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
    ],
  ];
  pieChartProducts: string[] = [
    'Great Value Graham Crackers (Per Serving)',
    'Kroger Creamy Peanut Butter (Per Serving)',
    'Nutella Hazelnut Spread (Per Serving)',
  ];
  ELEMENT_DATA = [
    { position: 1, name: 'Carbohydrates', weight: 23, symbol: 'g' },
    { position: 2, name: 'Fat', weight: 12, symbol: 'g' },
    { position: 3, name: 'Proteins', weight: 5.41, symbol: 'g' },
    { position: 4, name: 'Trans-Fat', weight: 0, symbol: 'g' },
    { position: 5, name: 'Saturated-Fat', weight: 4, symbol: 'g' },
    { position: 6, name: 'Sugars', weight: 21, symbol: 'g' },
    { position: 7, name: 'Fiber', weight: 2.7, symbol: 'g' },
    { position: 8, name: 'Calcium', weight: 0.04, symbol: 'mg' },
    { position: 9, name: 'Cholesterol', weight: 0.005, symbol: 'mg' },
    { position: 10, name: 'Salt', weight: 0.038, symbol: 'mg' },
    { position: 11, name: 'Sodium', weight: 0.015, symbol: 'mg' },
    { position: 12, name: 'Iron', weight: 0.001, symbol: 'mg' },
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.ELEMENT_DATA;
}
