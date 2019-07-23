import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchProvider {

  constructor(public http: Http,public global:Globals) {
    console.log('Hello SearchProvider Provider');
  }

  homeTopList(keyword:any):Observable<any>{
   return this.http.get(this.global.baseUrl + '/users/search_toplist?keyword='+keyword)
    .map((response:Response) =>response.json())
  }



  historyOrder(keyword:any,limit:number):Observable<any>{
   return this.http.get(this.global.baseUrl + '/users/search_history?keyword='+keyword+'&&limit='+limit)
    .map((response:Response) =>response.json())
  }

  home_keywords_list(keyword:any):Observable<any>{
    return this.http.get(this.global.baseUrl + '/users/search_keyword?keyword='+keyword)
    .map((response:Response) =>response.json())
  }




}
