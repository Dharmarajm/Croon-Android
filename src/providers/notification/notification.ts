import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: Http,public global:Globals) {
    console.log('Hello NotificationProvider Provider');
  }

  notificationDetails(id:any):Observable<any>{
   return this.http.get(this.global.baseUrl + '/users/notification_status?notification_id='+id)
  }

  // notificationList():Observable<any>{
  //  return this.http.get(this.global.baseUrl + '/users/notification_view')
  //   .map((response:Response) =>response.json())
  // }


  notificationList_limit(id:any,count:any):Observable<any>{
   return this.http.get(this.global.baseUrl + '/users/notification_view?user_id='+id+'&&limit='+count)
    .map((response:Response) =>response.json())
  }

  notificationCount(id:any):Observable<any>{
   return this.http.get(this.global.baseUrl + '/users/notification_count?user_id='+id)
  }

  notificationDelete(id:any):Observable<any>{
   return this.http.get(this.global.baseUrl + '/users/notification_delete?notification_id='+id)
  }
  
}
