import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.prod'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private http: HttpClient) { }
  coutriesName : BehaviorSubject<any> = new BehaviorSubject('');

  getCountryData(name = 'all'){
    return this.http.get(`${environment.baseURL}/statistics?country=${name}`, {
      headers: {
        'X-RapidAPI-Key': 'ce4d1c988dmsh560ebe80951bebfp11d3c9jsn36283007a6e8',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    })
  }

  getCountryName(){
   return this.http.get(`${environment.baseURL}/countries`,{
      headers:{
        'X-RapidAPI-Key': 'ce4d1c988dmsh560ebe80951bebfp11d3c9jsn36283007a6e8',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    })
  }

  getGraphData(name ='all'){
 return this.http.get(`${environment.baseURL}/history?country=${name}`,{
    headers:{
      'X-RapidAPI-Key': 'ce4d1c988dmsh560ebe80951bebfp11d3c9jsn36283007a6e8',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  })
  }

}
