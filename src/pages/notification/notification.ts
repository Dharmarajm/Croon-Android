
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, App, Nav } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { Globals } from '../../providers/global';
import { ModalController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

 /* Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  tabBarElement: any;
  all_notify: any[]=[];
  noti_count:any;
  noti_status:any;
  count_list:any;
  assignPush:any;
  getPushData:any;
  network_status:any;
  inScreenLoader:boolean = false;
  ud_id:any;

  constructor(public app:App,public nav:Nav,public navCtrl: NavController, public navParams: NavParams, private notify: NotificationProvider,public global:Globals, public modalCtrl : ModalController,public loadingCtrl: LoadingController,public platform:Platform,private oneSignal:OneSignal) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.count_list=10;
    platform.ready().then(() => {      
      platform.registerBackButtonAction(() => {
          this.navCtrl.pop();
      },0);
      this.triggerNotification();
    })
  }

  ionViewDidLoad() {
   if(this.global.network_status==2){
    
    this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){
      this.inScreenLoader=true;
      this.notify.notificationList_limit(this.ud_id,this.count_list).subscribe(res => {
      this.inScreenLoader=false;
      this.network_status=2;
        this.all_notify = res;
            if(this.all_notify.length == this.count_list){
               this.notify_infinite_count=1;
             }else{                     
               this.notify_infinite_count=2;
             }
        this.noti_count = this.all_notify.length;
    },
      error => {
        this.network_status=1;
        this.inScreenLoader=false;
        console.log(error);
      });
    }else{
      this.all_notify=[];
      this.noti_count=0;
      this.network_status=2;
    }
   }else{
     this.all_notify=[];
     this.network_status=1;
   } 
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    if(this.global.network_status==2){
      this.network_status=2;
    }else{
      this.network_status=1;
      this.all_notify=[];
    }
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  
  triggerNotification(){
    this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d');
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
               //this.navCtrl.parent.select(0);
               this.nav.setRoot('TabsPage',{tabIndex:0}) 
              }else{
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
               //this.navCtrl.parent.select(3);
               this.nav.setRoot('TabsPage',{tabIndex:3})
              }
            }else if(localStorage.getItem("noti_page")=="home"){
              //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0})
              //this.navCtrl.parent.select(0); 
              this.nav.setRoot('TabsPage',{tabIndex:0})
            }else{
              //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
              //this.navCtrl.parent.select(3); 
              this.nav.setRoot('TabsPage',{tabIndex:3})
            } 
          /*}*/
    
      });
      this.oneSignal.endInit();
       
      //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
  }

  public openModal(user, rank){
   if(this.global.network_status==2){ 
    localStorage.setItem("ViewDetails",user);
    localStorage.setItem("rank",rank);
    var modalPage = this.modalCtrl.create('ModalPage');
    modalPage.onDidDismiss(() => {
     this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){
      this.inScreenLoader=true;
      this.notify.notificationList_limit(this.ud_id,this.count_list).subscribe(res => {
      this.inScreenLoader=false;
      this.network_status=2;
        this.all_notify = res;
        this.noti_count = this.all_notify.length;
      },
      error => {
        this.network_status=1;
        this.inScreenLoader=false;
        console.log(error);
      });
     }else{
      this.all_notify=[];
      this.noti_count=0;
      this.network_status=2;
    }

      this.platform.ready().then(() => {      
        this.platform.registerBackButtonAction(() => {
          this.navCtrl.pop();
        },0);
        this.triggerNotification();
      })
    });
    modalPage.present();
   }else{
     this.network_status=1;
     this.all_notify=[];
   } 
  }

  notify_status(id){
   if(this.global.network_status==2){ 
     this.notify.notificationDetails(id).subscribe(res => {
        this.noti_status =  res;
      },
      error => {
        console.log(error);
      });

     
     this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){
      this.inScreenLoader=true;
      this.notify.notificationList_limit(this.ud_id,this.count_list).subscribe(res => {
      this.inScreenLoader=false;
      this.network_status=2;
        this.all_notify = res;
        this.noti_count = this.all_notify.length;
      },
      error => {
        this.network_status=1;
        this.inScreenLoader=false;
        console.log(error);
      });
     }else{
      this.all_notify=[];
      this.noti_count=0;
      this.network_status=2;
     }
   }else{
    this.network_status=1;
    this.all_notify=[];
   }
  }

  Network(){
    if(this.global.network_status==2){
    
    this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){
      this.inScreenLoader=true;
      this.notify.notificationList_limit(this.ud_id,this.count_list).subscribe(res => {
      this.inScreenLoader=false;
      this.network_status=2;
        this.all_notify = res;
        this.noti_count = this.all_notify.length;
      },
      error => {
        this.network_status=1;
        this.inScreenLoader=false;
        console.log(error);
      });
     }else{
      this.all_notify=[];
      this.noti_count=0;
      this.network_status=2;
     }
   }else{

     this.network_status=1;
   } 
  }

  notify_delete(id){
   if(this.global.network_status==2){ 
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
    loading.present();
      this.notify.notificationDelete(id).subscribe(res => {
        //let trash = res;
          // this.notify.notificationList_limit(this.count_list).subscribe(res => {
          //   loading.dismiss();
          //   this.all_notify =  res;
          //   this.noti_count = this.all_notify.length;
          // },
          // error => {
          // loading.dismiss();
          // console.log(error);
          // });

        this.ud_id = localStorage.getItem("storeID");
        if(this.ud_id!=null){
          this.notify.notificationList_limit(this.ud_id,this.count_list).subscribe(res => {
          loading.dismiss();
          this.network_status=2;
            this.all_notify = res;
            this.noti_count = this.all_notify.length;
          },
          error => {
            this.network_status=1;
            loading.dismiss();
            console.log(error);
          });
         }else{
          this.all_notify=[];
          this.noti_count=0;
          this.network_status=2;
         }
      },
      error => {
        console.log(error);
      });
    }else{
      this.network_status=1;
      this.all_notify=[];
    }  
  }

  notify_infinite_count:any;

  doInfinite(infiniteScroll) {
    if(this.global.network_status==2){ 
        this.count_list=this.count_list+10;
         
        setTimeout(() => {
             
              this.ud_id = localStorage.getItem("storeID");
              if(this.ud_id!=null){
                this.notify.notificationList_limit(this.ud_id,this.count_list).subscribe(res => {
                this.all_notify =  res;

                   if(this.all_notify.length == this.count_list){
                     this.notify_infinite_count=1;
                   }else{                     
                     this.notify_infinite_count=2;
                   }

                infiniteScroll.complete();
                this.noti_count = this.all_notify.length;
                },
                error => {
                  console.log(error);
                });
              }else{
                this.all_notify=[];
                this.noti_count=0;
                this.network_status=2;
              }
          }, 500);
    }else{
      this.network_status=1;
      this.all_notify=[];
    }
  }

}