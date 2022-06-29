import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import * as AOS from 'aos';
import { UserStorageService } from '../shared/services/auth/user-storage.service';
import { MacroCalculatorService } from '../shared/services/macro-calculator.service';
import * as moment from 'moment';

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
  date: string;
  constructor(
    private userStorageService: UserStorageService,
    private macroService: MacroCalculatorService
  ) {}

  ngOnInit(): void {
    this.date = new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    this.date = this.date.replace('/', '-').replace('/', '-');
    AOS.init();
    this.userStorageService
      .fetchUserFromFireBase()
      .subscribe((userData: any) => {
        if (
          userData.foodLog !== undefined &&
          userData.foodLog[this.date] !== undefined
        ) {
          this.macroService.foodLog = userData.foodLog[this.date];
          this.totalCalories = userData.macros.calorie.toFixed(0);
          this.totalCarbs = userData.macros.balanced.carbs.toFixed(0);
          this.totalFats = userData.macros.balanced.fat.toFixed(0);
          this.totalProteins = userData.macros.balanced.protein.toFixed(0);
          userData.foodLog[this.date].forEach((food: any) => {
            this.currentCalories += food.calories;
            this.currentCarbs += food.macros.carbs;
            this.currentFats += food.macros.fats;
            this.currentProteins += food.macros.proteins;
            this.value = Math.round(
              (this.currentCalories / this.totalCalories) * 100
            );
            let dataSet = this.dataSet();
            this.pieChartData.datasets = dataSet;
            this.chart?.update();
          });
        } else this.macroService.foodLog = [];
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
        data: [this.currentCarbs, this.currentFats, this.currentProteins],
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
  emptyDataSet() {
    return [
      {
        data: [0, 0, 0],
      },
    ];
  }
  OnDateChange(selectedDate: string) {
    this.date = moment(selectedDate).format('M-D-YYYY');
    this.userStorageService
      .fetchUserFromFireBase()
      .subscribe((userData: any) => {
        this.totalCalories = 0;
        this.currentCalories = 0;
        this.totalCarbs = 0;
        this.currentCarbs = 0;
        this.totalFats = 0;
        this.currentFats = 0;
        this.totalProteins = 0;
        this.currentProteins = 0;
        this.value = 0;
        let dataSet = this.emptyDataSet();
        this.pieChartData.datasets = dataSet;
        this.chart?.update();
        if (
          userData.foodLog !== undefined &&
          userData.foodLog[this.date] !== undefined
        ) {
          this.macroService.foodLog = userData.foodLog[this.date];
          this.totalCalories = userData.macros.calorie.toFixed(0);
          this.totalCarbs = userData.macros.balanced.carbs.toFixed(0);
          this.totalFats = userData.macros.balanced.fat.toFixed(0);
          this.totalProteins = userData.macros.balanced.protein.toFixed(0);
          userData.foodLog[this.date].forEach((food: any) => {
            this.currentCalories += food.calories;
            this.currentCarbs += food.macros.carbs;
            this.currentFats += food.macros.fats;
            this.currentProteins += food.macros.proteins;
            this.value = Math.round(
              (this.currentCalories / this.totalCalories) * 100
            );
            let dataSet = this.dataSet();
            this.pieChartData.datasets = dataSet;
            this.chart?.update();
          });
        } else this.macroService.foodLog = [];
      });
    let dataSet = this.dataSet();
    this.pieChartData.datasets = dataSet;
  }
}
