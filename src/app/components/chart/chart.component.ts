import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Chart } from 'chart.js';

import { Covid19Service } from 'src/app/_services/covid19.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  date:any 
  barChart:any;
  cases:any = '';
  recovered:any = '';
  deaths:any = '';
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('myChart', { static: false }) chart: ElementRef | undefined;
  constructor(private chartAPI: Covid19Service) { }


  ngOnInit(): void {
    this.chartAPI.coutriesName.subscribe( res => {
      this.cases = res[0]?.cases?.total;
      this.deaths = res[0]?.deaths?.total;
      this.recovered = res[0]?.cases?.recovered;
      
      
    })
  }
  ngAfterViewInit(): void {
    this.chartAPI.coutriesName.subscribe( res => {
      this.cases = res[0]?.cases?.total;
      this.deaths = res[0]?.deaths?.total;
      this.recovered = res[0]?.cases?.recovered;
      if(this.barChart){
        this.barChart.destroy()
      }
      this.barChartInit(this.cases, this.deaths, this.recovered)
      
    })
  }
  barChartInit(cases: any, deaths: any, recovered: any){
    console.log( String(cases), deaths, recovered);
    
  this.barChart = new Chart(this.chart?.nativeElement,{
    type: 'bar',
    data: {
        labels: ['Today'],
        datasets: [
          {
            label: 'Infected',
            data:  String(cases),
            borderColor: 'rgb(0,255,255)',
            backgroundColor: 'rgb(0,255,255)',

            borderWidth: 1,
          },
          {
            label: 'Deaths',
            data: deaths?.toString(),
            borderColor: 'rgb(224, 5, 5)',
            backgroundColor: 'rgb(224, 5, 5)',
            borderWidth: 1,
          },
          {
            label: 'Recovered',
            data: recovered?.toString(),
            borderColor: 'rgb(0,100,0)',
            backgroundColor: 'rgb(0,100,0)',

            borderWidth: 1,
          },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
  }
  
}






