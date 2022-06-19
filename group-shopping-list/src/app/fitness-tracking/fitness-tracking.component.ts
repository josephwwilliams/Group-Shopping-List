import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as AOS from 'aos';
import { UserStorageService } from '../shared/services/auth/user-storage.service';

@Component({
  selector: 'app-fitness-tracking',
  templateUrl: './fitness-tracking.component.html',
  styleUrls: ['./fitness-tracking.component.css'],
})
export class FitnessTrackingComponent implements OnInit {
  totalCalories: number = 0;
  currentCalories: number = 0;
  totalCarbs: number = 0;
  currentCarbs: number = 0;
  totalFats: number = 0;
  currentFats: number = 0;
  totalProteins: number = 0;
  currentProteins: number = 0;
  value: number = 0;
  constructor(private userStorageService: UserStorageService) {}

  ngOnInit(): void {
    AOS.init();
    this.userStorageService
      .fetchUserFromFireBase()
      .subscribe((userData: any) => {
        this.totalCalories = userData.macros.calorie.toFixed(0);
        this.totalCarbs = userData.macros.balanced.carbs.toFixed(0);
        this.totalFats = userData.macros.balanced.fat.toFixed(0);
        this.totalProteins = userData.macros.balanced.protein.toFixed(0);
        this.value = (this.currentCalories / this.totalCalories) * 100;
      });
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
}
