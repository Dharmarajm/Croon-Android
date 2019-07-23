import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, AlertController, LoadingController, App, Nav } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ModalController } from 'ionic-angular';
import { VotesProvider } from '../../providers/myvotes/myvotes';
import { Globals } from '../../providers/global';
import { NotificationProvider } from '../../providers/notification/notification';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-myvotes',
  templateUrl: 'myvotes.html',
})
export class MyvotesPage {
  
  @ViewChild('input') myInput ;

  public queryhistory : string = 'music';
  today:any;
  votesdetails:any[]=[];
  user_id:any;
  storeID:any;
  user:any;
  someValue:any;
  notify_count?:any;
  network_status:any;
  disconnectSubscription:any;
  connectSubscription:any;
  current_type:any;
  assignPush:any;
  getPushData:any;
  counter:number = 0;
  inScreenLoader:boolean = false;
  ud_id:any;
  count_list:number;
  checkFirst:boolean=true;
  showLoadMore:boolean=false;

  constructor(public app:App,public nav: Nav,public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public alertCtrl:AlertController, private socialSharing: SocialSharing, public modalCtrl : ModalController, public votes: VotesProvider,public global:Globals, public loadingCtrl: LoadingController, private notify: NotificationProvider,private network: Network,private oneSignal:OneSignal,private toast: Toast) {
    platform.ready().then(() => {        
        platform.registerBackButtonAction(() => {
        this.someValue="";
        if(this.global.toggled==false){
           if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => { this.counter = 0 }, 3000)
          } else {
            platform.exitApp();
          }
         }else{
           this.global.toggled=false;
           this.myvotesget();
         }
      }, 0)
      this.triggerNotification();
    })
       
        this.count_list=10;
        if(localStorage.getItem("user_id")!=null){
          this.user_id = localStorage.getItem("user_id");  
        }else{
          this.user_id=null;
        }

        if(localStorage.getItem("storeID")!=null){
          this.storeID=localStorage.getItem("storeID"); 
        }else{
          this.storeID=null;
        }  
    
  }

  ionViewDidLoad() {  
     this.myvotesget();  
  }


  ionViewWillEnter(){
    this.votesdetails=[];
    if(this.checkFirst==false){
      this.myvotesget();   
    }
   
    this.global.toggled = false;
    this.someValue="";
    this.global.current_page="MyvotesPage";
    this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){
      this.notify.notificationCount(this.ud_id).subscribe(res => {
        this.notify_count =  res._body;
    },
    error => {
        console.log(error);
    });
    }
    this.checkFirst=false; 
  }

  presentToast() {
    this.toast.show(`Press again to exit`, '2000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
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
               //this.nav.getActiveChildNav().select(0);
               this.nav.setRoot('TabsPage',{tabIndex:0}) 
              }else{
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
               //this.nav.getActiveChildNav().select(3);
               this.nav.setRoot('TabsPage',{tabIndex:3}) 
              }
            }else if(localStorage.getItem("noti_page")=="home"){
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0}) 
               //this.nav.getActiveChildNav().select(0);
               this.nav.setRoot('TabsPage',{tabIndex:0}) 
            }else{
               //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
               //this.nav.getActiveChildNav().select(3);
               this.nav.setRoot('TabsPage',{tabIndex:3}) 
            } 
          /*}*/
    
      });
      this.oneSignal.endInit();
       
      //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
  }

  compilemsg(index):string{
      var msg = "Hi i am Crooner";
      return msg.concat(" \n Sent from Croon App !");
  }

  regularShare(id){
    this.socialSharing.share(this.global.shareUrl+'genres/croon_share?id='+id);
  }


  cancelSearch(event){
   this.someValue="";
   this.global.toggled = false;
   //this.myvotesget();
  }


  public toggle(): void {
     this.global.toggled = this.global.toggled ? false : true;
     setTimeout(() => {
       this.myInput.setFocus();
     },150);
  }

   goto_login(){
      this.navCtrl.setRoot('LoginPage');
      let elements = document.querySelectorAll(".tabbar");

      if (elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display = 'none';
          });
      }
    }
  
  public openModal(user,rank){
   if(this.global.network_status==2){
    this.network_status=2; 
    localStorage.setItem("ViewDetails",user);
    localStorage.setItem("rank", rank);
    var data = { message : 'hello world' };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.onDidDismiss(() => {
              this.platform.ready().then(() => {    
              this.platform.registerBackButtonAction(() => {
               this.someValue="";
               if(this.global.toggled==false){
                 if (this.counter == 0) {
                  this.counter++;
                  this.presentToast();
                  setTimeout(() => { this.counter = 0 }, 3000)
                } else {
                  this.platform.exitApp();
                }
               }else{
                 this.global.toggled=false;
                 this.myvotesget();
               }  
              }, 0);
              this.triggerNotification();
            })
    }) 
    modalPage.present();
   }else{
      this.network_status=1;
      this.votesdetails=[]; 
   } 
   
  }

  notification(){
    this.navCtrl.push('NotificationPage');
  }

  myvotesget(){
    if(this.global.network_status == 2){
       this.votesdetails=[];
       this.network_status=2;
       this.inScreenLoader = true;
       if(this.user_id!=null){
        this.user=this.user_id;
        
       }else if(this.storeID!=null){
        this.user=this.storeID;
       }
       this.votes.votedisp(this.user)//uploaddisp ,this.count_list
       .subscribe(res=>{
         this.inScreenLoader = false;
         this.votesdetails=res;
         if(this.votesdetails.length == this.count_list){
            
            this.showLoadMore=true;
          }else{
            this.showLoadMore=false;
          }
       },error=>{
         this.inScreenLoader = false;
         console.log(error)
       })
    }else{
      this.votesdetails=[];
      this.network_status=1;
    }    
  }

   /*doInfinite(infiniteScroll) {
        setTimeout(() => {
          if(this.global.network_status==2){
            this.network_status=2;
            this.count_list=this.count_list+10;
            this.votes.votedisp_limit(this.user,this.count_list)
           .subscribe(res=>{
             this.votesdetails=res;
             infiniteScroll.complete(); 
             if(this.votesdetails.length == this.count_list){
               this.showLoadMore=true;
             }else{
               this.showLoadMore=false;
             }
             
            },error=>{
             console.log(error)
            })
           }else{
             infiniteScroll.complete();
           } 
          }, 500);
    }

    onInput(event){
      
      if(this.global.network_status==2){
       this.votesdetails=[]; 
       this.network_status=2;
       this.inScreenLoader = true;
     console.log(this.user_id)
       if(this.user_id!=null){
         console.log(this.user_id)
        this.user=this.user_id;
      
       }else if(this.storeID!=null){
        this.user=this.storeID;
       }
       console.log(this.user_id)
      if(this.someValue.length!=0){
        this.votes.votesSearch(this.user,this.someValue)//,this.count_list
        .subscribe(res=>{
         this.inScreenLoader = false;
         this.votesdetails=res;
        },error=>{
         this.inScreenLoader = false;
         this.votesdetails=[];
         console.log(error)
        })  
      }else{
         this.votes.votedisp_limit(this.user,this.count_list)//uploaddisp
         .subscribe(res=>{
         this.inScreenLoader = false;
         this.votesdetails=res;
         if(this.votesdetails.length == this.count_list){
            this.showLoadMore=true;
          }else{
            this.showLoadMore=false;
          }
         },error=>{
          this.inScreenLoader = false;
          console.log(error)
         })
      }
      
      }else{
       this.network_status=1;
       this.votesdetails=[];
      }     
    }*/

    
  }