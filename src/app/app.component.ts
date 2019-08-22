import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {HttpClient} from '@angular/common/http';
import {Color, Label} from 'ng2-charts';
import 'rxjs/add/operator/map';
import {WeatherService} from './service/weather.service';
// @ts-ignore
import precipitation from "../assets/precipitation.json";
import temperature from "../assets/temperature.json";
import {FilteredYearsPipe} from './pipe/filtered-years.pipe';

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
  filterdArrayByDate = [];

  public StartDate(dateUser, endDate) {
    this.dateUser = dateUser;
    this.endDate = endDate;

    let a = this.percipateList.filter(m => new Date(m.t) >= new Date(dateUser) && new Date(m.t) <= new Date(endDate));
    let b = this.temperatureList.filter(m => new Date(m.t) >= new Date(dateUser) && new Date(m.t) <= new Date(endDate));

    this.filterdArrayByDate = a.map(res => res.t);
    this.lineChartLabels = this.filterdArrayByDate;

    this.description = a.map(res => res.v);
    this.temperate = b.map(res => res.v);
    this.lineChartData = [{data: this.description}, {data: this.temperate}];

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


  constructor(private _weather: WeatherService, private dateFormat: FilteredYearsPipe, private http: HttpClient) {}

  ngOnInit() {
  }


}
