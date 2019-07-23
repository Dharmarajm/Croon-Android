import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, AlertController, LoadingController,ToastController} from 'ionic-angular';
//import { MenuPage } from '../menu/menu';
import { LoginProvider } from '../../providers/login/login';
import { Events } from 'ionic-angular';

import { Globals } from '../../providers/global';
import { MenuPage } from '../menu/menu';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  public unregisterBackButtonAction: any;
  
  isAvailable: Boolean = false;
  confirm:any;
  login_details:any;
  check:any;
  player:any;
  userData:any;
  @ViewChild('myInput') myInput ;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:LoginProvider,public platform:Platform,public alertCtrl:AlertController,public loadingCtrl: LoadingController,public events: Events,public toastCtrl: ToastController, public global: Globals, public menu:MenuPage,private facebook: Facebook,private googlePlus: GooglePlus) {
    platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('MenuPage');
      }, 0);
  }


  ionViewDidLoad(){

        window.setTimeout(() => {
          this.myInput.setFocus();
        }, 600);


        if(localStorage.getItem("email_id") != ''){
          this.login.emailid = localStorage.getItem("email_id");
        }
        if(localStorage.getItem("password") != ''){
          this.login.password = localStorage.getItem("password");
        }
        if(localStorage.getItem("checked") == 'true'){
          this.check = true;
        }else{
          localStorage.removeItem("email_id");
          localStorage.removeItem("password");
          this.login.emailid='';
          this.login.password='';
          this.check = false;
        }
  
       this.player = localStorage.getItem("player_id");
  }

 
  rememberme(){
      localStorage.setItem("email_id",this.login.emailid);
      localStorage.setItem("password",this.login.password);
      localStorage.setItem("checked",this.check);
     
  }

  loginfb(){
      this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
       this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}

         this.service.login_google_fb(this.userData.email,null,'facebook',this.userData.picture,this.userData.username,this.player)
          .subscribe(
          res => {
            this.login_details=res;
            this.menu.user_id = this.login_details.id;
            this.menu.user_name = this.login_details.first_name;
            if(this.login_details.image.length!=0){
              this.menu.user_image = this.login_details.image[0].image_path.url;
            }
            localStorage.setItem("user_id",this.login_details.id);
            localStorage.setItem("user_name",this.login_details.first_name);
            localStorage.setItem("storeID",this.login_details.id);
            localStorage.setItem("login_status",this.login_details.login_status);
            if(this.login_details.image.length!=0){
              localStorage.setItem("user_image",this.login_details.image[0].image_path.url);
            }
            this.navCtrl.setRoot('MenuPage');
          },error => {
              console.log(error);
          })   

      });
    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
  }

   logingoogle() {
    this.googlePlus.login({})
      .then(res => {
         this.service.login_google_fb(res.email,null,'google',res.imageUrl,res.displayName,this.player)
          .subscribe(
          res => {
            this.login_details=res;
            this.menu.user_id = this.login_details.id;
            this.menu.user_name = this.login_details.first_name;
            if(this.login_details.image.length!=0){
                  this.menu.user_image = this.login_details.image[0].image_path.url;
            }
            localStorage.setItem("user_id",this.login_details.id);
            localStorage.setItem("user_name",this.login_details.first_name);
            localStorage.setItem("storeID",this.login_details.id);
            localStorage.setItem("login_status",this.login_details.login_status);
            if(this.login_details.image.length!=0){
              localStorage.setItem("user_image",this.login_details.image[0].image_path.url);
            }
           this.navCtrl.setRoot('MenuPage');
          },error => {
            console.log(error);
          })       
      })
      .catch(err => console.error(err));
  }

  signup(){
    this.navCtrl.setRoot('SignupPage');
  }

  cancel(){  

    this.navCtrl.setRoot('MenuPage');
     let elements = document.querySelectorAll(".tabbar");

      if (elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display = 'none';
          });
      }
  }

  forgotpassword(){
    this.navCtrl.setRoot('ForgotpasswordPage');
  }

  login: any = {emailid:'',password:'', player: this.player};
   
    user:any;

    doLogin(){    

     var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
          

    if(this.login.emailid == '' || this.login.emailid == null){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the Email-ID`,
            buttons: ['Ok']
          });
          alert.present();
    }else if(!email_validation.test(this.login.emailid)) { 
          let alert = this.alertCtrl.create({
              title: `Croon`,
              message: `Invalid Email-ID`,
              buttons: ['Ok']
            });
            alert.present();
    }else if(this.login.password == '' || this.login.password == null ){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the password`,
            buttons: ['Ok']
          });
          alert.present();
    }else{  
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present(); 

      this.service.login(this.login.emailid.toLowerCase(), this.login.password, this.player )
            .subscribe(
            res => {
                loading.dismiss();
                this.login_details=res;
                if(this.login_details == false){
                        this.login.password='';
                        let alert = this.alertCtrl.create({
                          title: `Croon`,
                          message: `Invalid details`,
                          buttons: ['Ok']
                        });
                        alert.present();
                }else if(this.login_details.id > 0){
                  this.menu.user_id = this.login_details.id;
                  this.menu.user_name = this.login_details.first_name;
                  if(this.login_details.image.length!=0){
                  this.menu.user_image = this.login_details.image[0].image_path.url;
                  }

                  localStorage.setItem("user_id",this.login_details.id);
                  localStorage.setItem("user_name",this.login_details.first_name);
                  if(this.login_details.image.length!=0){
                    localStorage.setItem("user_image",this.login_details.image[0].image_path.url);
                  }
                  localStorage.setItem("storeID",this.login_details.id);
                  if(localStorage.getItem("user_name") == 'null'){
                    localStorage.setItem("ProfileShow",'true');
                    this.navCtrl.setRoot('ProfilePage');
                  }else if(localStorage.getItem("user_name") != 'null'){
                    this.navCtrl.setRoot('MenuPage');
                  }
                  this.events.publish('user:created', this.user=localStorage.getItem("user_id"), Date.now());
                } 
            },
            error => {
                loading.dismiss();
                console.log(error);
                let alert = this.alertCtrl.create({
                  title: `Server error`,
                  message: `There are issues connecting to Croon.please try again later.`,
                  buttons: ['Ok']
                });
                alert.present();
            });
       }
    } 



}
