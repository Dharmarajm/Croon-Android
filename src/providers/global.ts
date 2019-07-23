
import { Injectable } from '@angular/core';

Injectable()
export class Globals{

     userID:any;
     user_name:any;
     image:any;
	   toggled: boolean=false;
     modalActive:boolean;
     current_page:any;
     network_status:any;

     //Local IP Config
       /*baseUrl="http://192.168.1.61:4000/api/v1";
       imageUrl="http://192.168.1.61:4000";
       shareUrl="http://192.168.1.61:4000/";*/
    
     /*  Local IP Port Forwarding Config
       baseUrl="http://115.111.129.98:4003/api/v1";
       imageUrl="http://115.111.129.98:4003";
       shareUrl="http://115.111.129.98:4003/";*/
    /*
    baseUrl="http://54.88.33.35/api/v1";
    imageUrl="http://54.88.33.35";
    shareUrl="http://54.88.33.35/";*/


    baseUrl="https://app.croonapp.com/api/v1";
    imageUrl="https://app.croonapp.com";
    shareUrl="https://app.croonapp.com/";


      /* baseUrl="http://192.168.1.61:4005/api/v1";
       imageUrl="http://192.168.1.61:4005";
       shareUrl="http://192.168.1.61:4005";*/
    
    }