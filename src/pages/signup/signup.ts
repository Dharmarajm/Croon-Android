import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, LoadingController,AlertController, ToastController} from 'ionic-angular';

import { LoginPage } from './../login/login';
import { SignupProvider } from '../../providers/signup/signup';
//import { TermsPage } from './../terms/terms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signup_details:any;

    @ViewChild('myInput') myInput ;



  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SignupProvider,public loadingCtrl: LoadingController,public platform:Platform,public alertCtrl:AlertController,public toastCtrl: ToastController) {
     platform.registerBackButtonAction(() => {
       this.navCtrl.setRoot(LoginPage);
      }, 0);
  }

  ionViewDidLoad() {
    window.setTimeout(() => {
      this.myInput.setFocus();
    }, 600);
  }

  back(){
    this.navCtrl.setRoot(LoginPage);
  }


  signup: any = {emailid:'',password:'',confrim:''};
   
    gotologin(){     

      var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
     

      if(this.signup.emailid == '' || this.signup.emailid == null){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the Email-ID`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(!email_validation.test(this.signup.emailid)) { 
            let alert = this.alertCtrl.create({
                title: `Croon`,
                message: `Invalid Email-ID`,
                buttons: ['Ok']
              });
              alert.present();
       }else if(this.signup.password == '' || this.signup.password == null){
         let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the password`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(this.signup.password.length < 5){
         let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the minmum 5 character in password field`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(this.signup.confrim == '' || this.signup.confrim == null){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the confirm password`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(this.signup.password != this.signup.confrim){
        this.signup.password ='';
        this.signup.confrim ='';
         let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Passwords do not match`,
            buttons: ['Ok']
          });
          alert.present();
      }else{
        localStorage.setItem("email_id_signup",this.signup.emailid);
        localStorage.setItem("password_signup",this.signup.password);
        this.navCtrl.setRoot('TermsPage'); 
      }
    } 
}
