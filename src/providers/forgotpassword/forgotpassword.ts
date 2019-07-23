import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForgotpasswordProvider {

  constructor(public global:Globals,public http:HttpClient) {
    console.log('Hello ForgotpasswordProvider Provider');
  }

  forgotpassword(emailid: string){
        return this.http.get(this.global.baseUrl+'/users/forgot_password?email_id='+emailid);    
  }

  forgotpassword_otp(emailid: string, otp: string){
        return this.http.get(this.global.baseUrl+'/users/get_otp?email_id='+emailid+'&&otp='+otp);    
  }

  forgotpassword_final(emailid: string, otp: string,password: string){
        return this.http.put(this.global.baseUrl+'/users/set_password', { "email_id" : emailid,"otp": otp, "password" : password});    
  }

}
