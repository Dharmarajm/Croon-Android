import { Http, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VotesProvider {

  constructor(public http: Http,public global:Globals, public https: HttpClient) {
    console.log('Hello VotesProvider Provider');
  }

  votedisp(id:any):Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/myvotes?user_id='+id)
    .map((response:Response) =>response.json())
  }

  uploaddisp(id:any):Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/myuploads?user_id='+id)
    .map((response:Response) =>response.json())
  }

  votedisp_limit(id:any,count:any):Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/myvotes?user_id='+id+'&&limit='+count)
    .map((response:Response) =>response.json())
  }

  uploaddisp_limit(id:any,count:any):Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/myuploads?user_id='+id+'&&limit='+count)
    .map((response:Response) =>response.json())
  }
  

  register(data): Observable<any>{
    return this.https.post(this.global.baseUrl+'/users/profile_upload', JSON.stringify(data), httpOptions);
  }

  uploadSearch(userId:any,keyword:any):Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/my_upload_search?user_id='+userId+'&&keyword='+keyword)
    .map((response:Response) =>response.json())
  }

  votesSearch(userId:any,keyword:any):Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/my_vote_search?user_id='+userId+'&&keyword='+keyword)
    .map((response:Response) =>response.json())
  } 
}