import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as AOS from 'aos';
import { interval } from 'rxjs';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Product } from '../shared/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  shoppingList: Product[] = [];
  title = 'group-shopping-list';
  constructor(private shoppingListService: ShoppingListService) {}
  current: number = 0;
  ngOnInit(): void {
    AOS.init();
    let dataSet = this.dataSet();
    this.pieChartData.datasets = dataSet;
    this.shoppingList = this.shoppingListService.shoppingList;
    interval(7000).subscribe(() => {
      if (this.current === 2) {
        this.current = 0;
      }
      this.pieChartData.datasets = this.dataSets[this.current];
      this.current += 1;
      this.chart?.update();
      AOS.refresh();
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
    labels: [['Carbs (g) '], ['Fats (g) '], ['Protein (g) ']],
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
        data: [55, 15, 30],
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
        data: [45, 20, 35],
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
        data: [40, 30, 30],
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
        data: [55, 15, 30],
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
