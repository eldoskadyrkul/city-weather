import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './service/weather.service';
import { FilteredYearsPipe } from './pipe/filtered-years.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilteredYearsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,

    BsDatepickerModule.forRoot()
  ],
  providers: [
    WeatherService,
    FilteredYearsPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
