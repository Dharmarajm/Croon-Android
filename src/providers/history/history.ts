import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class HistoryProvider {

  constructor(public global:Globals,public http:HttpClient) {
    console.log('Hello HistoryProvider Provider');
  }

  history_dates(){
        return this.http.get(this.global.baseUrl+'/users/competitions');    
  }

  history_paticular_dates(name:any,start_date:any){
     return this.http.get(this.global.baseUrl+'/users/competition_select?data='+name+'&&start_date='+start_date);    
  }

  history_music_details(dates_id:any,genre_id:any){    
     return this.http.get(this.global.baseUrl+'/users/history?competition_transaction_id='+ dates_id +'&&genre_id='+genre_id);    
  }

   history_music_details_limit(dates_id:any,genre_id:any,count:any){    
     return this.http.get(this.global.baseUrl+'/users/history?competition_transaction_id='+ dates_id +'&&genre_id='+genre_id+'&&limit='+count);    
  }

  history_type(){
    return this.http.get(this.global.baseUrl+'/users/genres');    
  }

  history_type_first(){
    return this.http.get(this.global.baseUrl+'/users/genres_first');
     
  }
}
