import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChangepasswordProvider {

  constructor(public global:Globals,public http:HttpClient) {
    console.log('Hello ChangepasswordProvider Provider');
  }

 changepassword(emailid: string, password: string,new_password: string){
        return this.http.put(this.global.baseUrl+'/users/change_password', { "email_id" : emailid, "password" : password, "new_password": new_password});
    
  }
}
