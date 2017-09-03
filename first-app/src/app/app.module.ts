import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmployeeService } from './request.service';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DoughnutChartDemoComponent } from './donut/donut.component';

@NgModule({
  declarations: [
    AppComponent,
    DoughnutChartDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule   
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
