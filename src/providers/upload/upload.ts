import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the UploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UploadProvider {

  constructor(public http: Http,public global:Globals) {
    console.log('Hello UploadProvider Provider');
  }
  
  getLanguages():Observable<any> {
  return this.http.get(this.global.baseUrl + '/users/languages')
    .map((response:Response) =>response.json())
  }

}
