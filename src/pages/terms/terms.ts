import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, LoadingController,AlertController, ToastController} from 'ionic-angular';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import { SignupProvider } from '../../providers/signup/signup';
import { LoginPage } from './../login/login';
import { SignupPage } from './../signup/signup';


@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SignupProvider,public loadingCtrl: LoadingController,public platform:Platform,public alertCtrl:AlertController,public toastCtrl: ToastController) {
  }

  signup_details:any;

  signup: any = {emailid:'',password:''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.signup.emailid = localStorage.getItem("email_id_signup");
    this.signup.password = localStorage.getItem("password_signup");
  }

  back(){
    this.navCtrl.setRoot(SignupPage);
  }
  
  check_terms:any;

  terms(check_values){
  this.check_terms = check_values;
  }
   
  gotologin_final(){   
    if(this.check_terms == false || this.check_terms == '' || this.check_terms == undefined){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please select the terms and conditions`,
            buttons: ['Ok']
          });
          alert.present();
    }else if(this.check_terms == true){


      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loading.present();      
      
        this.service.signup(this.signup.emailid.toLowerCase(), this.signup.password)
            .subscribe(
              res => {
                  loading.dismiss();
                  this.signup_details=res;
                  if(this.signup_details == true){ 
                    let toast = this.toastCtrl.create({
                        message: 'Your registration completed!',
                        duration: 2000,
                        position: 'bottom'
                      });
                    toast.present();
                 
                    this.navCtrl.setRoot(LoginPage);                  
                  }else{
                    let alert = this.alertCtrl.create({
                      title: `Croon`,
                      message: `This email already exists`,
                      buttons: ['Ok']
                    });
                    alert.present();
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
