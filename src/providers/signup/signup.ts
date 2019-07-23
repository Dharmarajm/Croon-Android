import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignupProvider {

  constructor(public global:Globals,public http:HttpClient) {
    console.log('Hello SignupProvider Provider');
  }

 signup(emailid: string, password: string){
        return this.http.post(this.global.baseUrl+'/users/register', { "email_id" : emailid, "password" : password });
    
  }
}
