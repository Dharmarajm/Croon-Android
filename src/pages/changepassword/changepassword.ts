import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform, App, Nav} from 'ionic-angular';

import { LoginPage } from './../login/login';
import { ChangepasswordProvider } from '../../providers/changepassword/changepassword';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  @ViewChild('myInput') myInput ;
  change_details:any;
  change: any = {emailid:'',password:'',new_password:''};
  assignPush:any;
  getPushData:any;
  
  constructor(public app:App,public nav:Nav,public navCtrl: NavController,public service:ChangepasswordProvider,public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl:AlertController,public toastCtrl: ToastController,public platform:Platform,private oneSignal:OneSignal) {
    platform.ready().then(() => {      
      platform.registerBackButtonAction(() => {
       this.navCtrl.setRoot('MenuPage');
      }, 0);
      this.triggerNotification();
    })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');

     window.setTimeout(() => {
      this.myInput.setFocus();
    }, 600);
  }

  
  triggerNotification(){
    this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.getIds().then((id) => {
         localStorage.setItem("player_id", id.userId);
     
        });
        this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe((data) => {
        // handle received here how you wish.
        }); 
        this.oneSignal.handleNotificationOpened().subscribe((result) => { 
          this.assignPush = JSON.stringify(result.notification.isAppInFocus);
          this.getPushData = result.notification.payload.additionalData;
          localStorage.setItem("action", this.assignPush);

          /*if(localStorage.getItem("action") == 'false'){
            
          }else{*/
            localStorage.setItem("noti_page", this.getPushData.action);
            if(this.getPushData.value!=undefined || this.getPushData.value!=null){
              localStorage.setItem("ViewDetails", this.getPushData.value.id);
              localStorage.setItem("noti_genre_id", this.getPushData.value.genre.id);
              localStorage.setItem("noti_genre_type", this.getPushData.value.genre.genre_type);
              if(localStorage.getItem("noti_page")=="home"){ 
               this.nav.setRoot('TabsPage',{tabIndex:0})
              }else{
               this.nav.setRoot('TabsPage',{tabIndex:3})
              }
            }else if(localStorage.getItem("noti_page")=="home"){
              this.nav.setRoot('TabsPage',{tabIndex:0})
            }else{
              this.nav.setRoot('TabsPage',{tabIndex:3})
            }
          /*}*/
    
      });
      this.oneSignal.endInit();
       
      //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
  }
   
    goto_login(){
      var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 


      if(this.change.emailid == '' || this.change.emailid == null){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the Email-ID`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(!email_validation.test(this.change.emailid)) { 
          let alert = this.alertCtrl.create({
              title: `Croon`,
              message: `Invalid Email-ID`,
              buttons: ['Ok']
            });
            alert.present();
       }else if(this.change.password == '' || this.change.password == null){
         let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the old password`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(this.change.password.length < 5){
             let alert = this.alertCtrl.create({
                title: `Croon`,
                message: `Please enter the minmum 5 character in password field`,
                buttons: ['Ok']
              });
              alert.present();
      }else if(this.change.new_password == '' || this.change.new_password == null){
          let alert = this.alertCtrl.create({
            title: `Croon`,
            message: `Please enter the new password`,
            buttons: ['Ok']
          });
          alert.present();
      }else if(this.change.new_password.length < 5){
             let alert = this.alertCtrl.create({
                title: `Croon`,
                message: `Please enter the minmum 5 character`,
                buttons: ['Ok']
              });
              alert.present();
      }else{  
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loading.present();             
        this.service.changepassword(this.change.emailid.toLowerCase(), this.change.password, this.change.new_password)
            .subscribe(
              res => {
                  loading.dismiss();
                  this.change_details=res;
                  if(this.change_details == true){                  
                    this.navCtrl.setRoot(LoginPage);  
                    let toast = this.toastCtrl.create({
                        message: 'Your password has been changed',
                        duration: 2000,
                        position: 'bottom'
                      });
                    toast.present();                
                  }else{
                    this.change.new_password = '';
                    this.change.password='';
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
