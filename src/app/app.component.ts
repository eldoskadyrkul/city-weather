import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {Color, Label} from 'ng2-charts';
import 'rxjs/add/operator/map';
import {WeatherService} from './service/weather.service';
// @ts-ignore
import precipitation from "../assets/precipitation.json";
import temperature from "../assets/temperature.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  dateUser = [];
  description;
  temperate;
  endDate: string = "";
  percipateList: any[] = precipitation;
  temperatureList: any[] = temperature;

  public StartDate(dateUser, endDate) {
    this.dateUser = dateUser;
    this.endDate = endDate;
    let minDate = new Date("1881-01-01");
    let maxDate = new Date("2006-12-31");
    this.lineChartLabels = [dateUser, endDate];

    let value_1 = this.percipateList.find(res => res.t == dateUser);
    let value_2 = this.percipateList.find(res => res.t == endDate);
    let value_3 = this.temperatureList.find(res => res.t == dateUser);
    let value_4 = this.temperatureList.find(res => res.t == endDate);
    this.lineChartData = [{data: [this.description = value_1.v, this.description = value_2.v]},
      {data: [this.temperate = value_3.v, this.temperate = value_4.v]}];

  }


  public lineChartData: ChartDataSets[] = [{data: []}];
  public lineChartLabels: Label[];
  public lineChartOptions : (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          id: 'years',
          position: 'left',
        }
      ],
      yAxes: [
        {
          id: 'points',
          position: 'right',
        }
      ]
    },
    elements: {
      line: {
        fill: false
      }
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical'
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType = 'line';

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  constructor(private _weather: WeatherService, private http: HttpClient) {}

  ngOnInit() {
  }


}
