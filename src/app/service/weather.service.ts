import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getPrecipitation() {
    let URLAPI = '/assets/precipitation.json';
    return this.http.get(URLAPI, {responseType: 'json'}).map(result => result);
  }
}
