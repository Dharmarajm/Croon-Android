import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App, Nav } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { NotificationProvider } from '../../providers/notification/notification';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  
  assignPush:any;
  getPushData:any;
  notify_count?:any;
  ud_id:any;
  
  constructor(public app:App,public nav: Nav,public navCtrl: NavController, public navParams: NavParams,public platform:Platform,private oneSignal:OneSignal,private notify: NotificationProvider) {
  	platform.ready().then(() => {     
     platform.registerBackButtonAction(() => {
       this.navCtrl.setRoot('MenuPage');
      }, 0);
      this.triggerNotification();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ionViewWillEnter(){
   this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){ 
     this.notify.notificationCount(this.ud_id).subscribe(res => {
        this.notify_count =  res._body;
     },
     error => {
        console.log(error);
     });
   }  
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
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0})
               this.nav.setRoot('TabsPage',{tabIndex:0})
              }else{
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
               this.nav.setRoot('TabsPage',{tabIndex:3})
              }
            }else if(localStorage.getItem("noti_page")=="home"){
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0}) 
               this.nav.setRoot('TabsPage',{tabIndex:0})
            }else{
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
               this.nav.setRoot('TabsPage',{tabIndex:3})
            }
          /*}*/
    
      });
      this.oneSignal.endInit();
       
      //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
  }
  
  notification(){
    this.navCtrl.push('NotificationPage');
  }
 
}
