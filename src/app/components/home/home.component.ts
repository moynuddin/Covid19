import { Component, OnInit } from '@angular/core';
import millify from "millify";
import { Covid19Service } from 'src/app/_services/covid19.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  result:any;
  cases:any;
  deaths:any;
  recovered:any;
  newCase:any;
  newDeaths:any;
  countries:any;
  constructor(private covideAPI: Covid19Service) { }

  ngOnInit(): void {

    this.covideAPI.getCountryData().subscribe( res=> {
      // this.result = res['response'];
      console.log(res['response']);
      this.covideAPI.coutriesName.next(res['response']);
      this.getCases(res['response']);
    })
    this.covideAPI.getCountryName().subscribe( res => {      
      this.countries = res['response'];  
     
          
    })
  }


  getCases(data){
    this.cases =  millify(data[0].cases.total);
      this.newCase =  millify(data[0].cases.new);
      this.deaths =  millify(data[0].deaths.total);
      this.newDeaths = millify(data[0].deaths.new);
      this.recovered = millify(data[0].cases.recovered);
}


  selectCountry(event: any){
    console.log(event.target.value);
    this.covideAPI.getCountryData(event.target.value).subscribe( res => {
      console.log(res);
      this.covideAPI.coutriesName.next(this.getCases(res['response']));
    })
  }

}
