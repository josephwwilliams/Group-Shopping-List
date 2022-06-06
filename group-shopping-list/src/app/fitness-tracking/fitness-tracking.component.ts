import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as AOS from 'aos';

@Component({
  selector: 'app-fitness-tracking',
  templateUrl: './fitness-tracking.component.html',
  styleUrls: ['./fitness-tracking.component.css'],
})
export class FitnessTrackingComponent implements OnInit {
  value: number = 40;
  constructor() {}

  ngOnInit(): void {
    AOS.init();
    let dataSet = this.dataSet();
    this.pieChartData.datasets = dataSet;
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
  // dataSets = [
  //   [
  //     {
  //       data: [45, 20, 35],
  //       backgroundColor: [
  //         'rgb(77, 130, 120, 0.5)',
  //         'rgb(164, 208, 175, 0.5)',
  //         'rgb(56, 73, 81, 0.5)',
  //       ],
  //       borderColor: ['white'],
  //       pointBackgroundColor: ['#4d8278', '#A4D0AF', '#384951'],
  //       pointBorderColor: ['#fff'],
  //       pointHoverBackgroundColor: ['#fff'],
  //       pointHoverBorderColor: ['#4d8278', '#A4D0AF', '#384951'],
  //       hoverBackgroundColor: ['#4d8278', '#A4D0AF', '#384951'],
  //       hoverBorderColor: ['#4d8278', '#A4D0AF', '#384951'],
  //     },
  //   ],
  //   [
  //     {
  //       data: [40, 30, 30],
  //       backgroundColor: [
  //         'rgb(77, 130, 120, 0.5)',
  //         'rgb(164, 208, 175, 0.5)',
  //         'rgb(56, 73, 81, 0.5)',
  //       ],
  //       borderColor: ['white'],
  //       pointBackgroundColor: ['#4d8278', '#A4D0AF', '#384951'],
  //       pointBorderColor: ['#fff'],
  //       pointHoverBackgroundColor: ['#fff'],
  //       pointHoverBorderColor: ['#4d8278', '#A4D0AF', '#384951'],
  //       hoverBackgroundColor: ['#4d8278', '#A4D0AF', '#384951'],
  //       hoverBorderColor: ['#4d8278', '#A4D0AF', '#384951'],
  //     },
  //   ],
  // ];
}
