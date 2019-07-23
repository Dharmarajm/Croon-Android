import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginProvider {

  constructor(public global:Globals,public http:HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  login(emailid: string, password: string, player: string){
  	  return this.http.post(this.global.baseUrl+'/users/login', { "email_id" : emailid, "password" : password, "player_id" : player });    
  }


  login_google_fb(email_id: string,password: string,login_status: string,image_path: string,name: string, player: string){
	return this.http.post(this.global.baseUrl+'/users/social_media_registration', { "email_id" : email_id, "password" : password, "login_status" : login_status, "image_path" : image_path, "name" : name,"player_id" : player });
  }
}
