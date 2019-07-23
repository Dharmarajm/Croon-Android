import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Platform,AlertController,ToastController} from 'ionic-angular';

import { LoginPage } from './../login/login';
import { ForgotpasswordProvider } from '../../providers/forgotpassword/forgotpassword';


@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  @ViewChild('myInput') myInput ;

  constructor(public navCtrl: NavController,public service:ForgotpasswordProvider, public loadingCtrl: LoadingController,public navParams: NavParams,public platform:Platform,public alertCtrl:AlertController,public toastCtrl: ToastController) {
      platform.registerBackButtonAction(() => {
       this.navCtrl.setRoot(LoginPage);
      }, 0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
    this.otp_box=0;
    
      window.setTimeout(() => {
      this.myInput.setFocus();
    }, 600); 
  }

   forgot_details:any;
   forgot_details_otp:any;
   forgot_details_final:any;
   forgot: any = {emailid:'',otp:'',password:'',confrim:''};   
   otp_box:any;
 

  goto_login(){
  var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

      if(this.otp_box  == 0){
              if(this.forgot.emailid == '' || this.forgot.emailid == null){
                    let alert = this.alertCtrl.create({
                      title: `Croon`,
                      message: `Please enter the Email-ID`,
                      buttons: ['Ok']
                    });
                    alert.present();
                }else if(!email_validation.test(this.forgot.emailid)) { 
                  let alert = this.alertCtrl.create({
                      title: `Croon`,
                      message: `Invalid Email-ID`,
                      buttons: ['Ok']
                    });
                    alert.present();
                }else{  
                  let loading = this.loadingCtrl.create({
                    content: 'Please wait...'
                  });

                  loading.present();          
                  this.service.forgotpassword(this.forgot.emailid.toLowerCase())
                      .subscribe(
                        res => {
                            
                            localStorage.setItem("email_id_forgot",this.forgot.emailid.toLowerCase());
                            loading.dismiss();
                            this.forgot_details=res;
                            if(this.forgot_details == true){                  
                              this.otp_box=1;  
                              let alert = this.alertCtrl.create({
                                title: `Croon`,
                                message: `OTP is sent to your Email-ID`,
                                buttons: ['Ok']
                              });
                              alert.present();    

                            }else{
                              let alert = this.alertCtrl.create({
                                title: `Croon`,
                                message: `Invalid details`,
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
        }else if(this.otp_box  == 1){
                  if(this.forgot.otp == '' || this.forgot.otp == null){
                      let alert = this.alertCtrl.create({
                        title: `Croon`,
                        message: `Please enter the OTP`,
                        buttons: ['Ok']
                      });
                      alert.present();
                  }else{  
                    let loading = this.loadingCtrl.create({
                      content: 'Please wait...'
                    });

                    loading.present(); 

                    this.service.forgotpassword_otp(this.forgot.emailid.toLowerCase(),this.forgot.otp)
                        .subscribe(
                          res => {     
                                                 
                              localStorage.setItem("otp_forgot",this.forgot.otp);
                              loading.dismiss();
                              this.forgot_details_otp=res;
                              if(this.forgot_details_otp == true){   
                                this.otp_box=2; 
                                   let toast = this.toastCtrl.create({
                                        message: 'Your OTP is verified successfully',
                                        duration: 2000,
                                        position: 'bottom'
                                      });
                                    toast.present();
                              }else{
                                this.forgot.otp='';
                                let alert = this.alertCtrl.create({
                                  title: `Croon`,
                                  message: `Invalid details`,
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
        }else if(this.otp_box  == 2){
                  if(this.forgot.password == '' || this.forgot.password == null){
                     let alert = this.alertCtrl.create({
                        title: `Croon`,
                        message: `Please enter the password`,
                        buttons: ['Ok']
                      });
                      alert.present();
                  }else if(this.forgot.password.length < 5){
                     let alert = this.alertCtrl.create({
                        title: `Croon`,
                        message: `Please enter the minimum 5 character in password field`,
                        buttons: ['Ok']
                      });
                      alert.present();
                  }else if(this.forgot.confrim == '' || this.forgot.confrim == null){
                      let alert = this.alertCtrl.create({
                        title: `Croon`,
                        message: `Please enter the confirm password`,
                        buttons: ['Ok']
                      });
                      alert.present();
                  }else if(this.forgot.password != this.forgot.confrim){
                          this.forgot.password='';
                          this.forgot.confrim='';
                     let alert = this.alertCtrl.create({
                        title: `Croon`,
                        message: `Passwords do not match`,
                        buttons: ['Ok']
                      });
                      alert.present();
                  }else{
                        let loading = this.loadingCtrl.create({
                        content: 'Please wait...'
                      });

                      loading.present();             
                      this.service.forgotpassword_final(this.forgot.emailid.toLowerCase(),this.forgot.otp,this.forgot.password)
                          .subscribe(
                            res => {
                                loading.dismiss();
                                this.forgot_details_final=res;
                                if(this.forgot_details_final == true){                  
                                  this.navCtrl.setRoot('LoginPage');               
                                }else{
                                    this.forgot.password='';
                                    this.forgot.confrim='';
                                  let alert = this.alertCtrl.create({
                                    title: `Croon`,
                                    message: `Invalid details`,
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

 
  back(){
    this.navCtrl.setRoot(LoginPage);
  }

}
