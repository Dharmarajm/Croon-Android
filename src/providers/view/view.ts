import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the ViewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViewProvider {

  constructor(public http: Http, public global:Globals) {
    console.log('Hello ViewProvider Provider');
  }
  
  getComments(id:any):Observable<any> {
    return this.http.get(this.global.baseUrl + '/users/comments?upload_id='+id)
    .map((response:Response) =>response.json())
  }

  getComments_limit(id:any,count:any):Observable<any> {
    return this.http.get(this.global.baseUrl + '/users/comments?upload_id='+id+'&&limit='+count)
    .map((response:Response) =>response.json())
  }

  uploadCmts(data:any):Observable<any> {
    return this.http.post(this.global.baseUrl + '/users/post_comments',data)
    .map((response:Response) =>response.json())
  }

  voteUpdate(data:any):Observable<any> {
    return this.http.post(this.global.baseUrl + '/users/post_vote',data)
  }

  Votestatus(userId:any,uploadId:any):Observable<any> {
    return this.http.get(this.global.baseUrl + '/users/check_vote?user_id='+userId+'&&upload_id='+uploadId)
    .map((response:Response) =>response.json())
  }

  Reportstatus(data:any):Observable<any> {
    return this.http.post(this.global.baseUrl + '/users/my_upload_report',data)
    .map((response:Response) =>response.json())
  }

  Reportuser(data:any):Observable<any> {
   return this.http.post(this.global.baseUrl + '/users/block_user',data)
    .map((response:Response) =>response.json()) 
  }
}