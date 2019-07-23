import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, App, Nav } 
from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { ModalController } from 'ionic-angular';
import { Globals } from '../../providers/global';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage{
  

@ViewChild('myInput') myInput ;


  someValue:any;
  SearchOrder:any[]=[];
  ID:any;
  limit:number=100;
  tabBarElement:any;
  Template:boolean = false;
  searchTemplate:boolean = false;
  loading:any;
  display_details:any;
  Search_keywords:any;
  prevPage:any;
  assignPush:any;
  network_status:any;
  getPushData:any;

  constructor(public app:App,public navCtrl: NavController,public nav:Nav,public navParams: NavParams,public SearchService:SearchProvider,public modalCtrl : ModalController,public global:Globals,public loadingCtrl: LoadingController,public platform:Platform,private oneSignal:OneSignal) {
   platform.ready().then(() => {
     platform.registerBackButtonAction(() => {  
          this.navCtrl.pop();
     }, 0);
     //this.triggerNotification();
   })
   if(localStorage.getItem("user_id")!=null){
     this.ID=localStorage.getItem("user_id")
   }else{
     this.ID=null;
   }
   this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
   this.display_details=0;
   
  }

  ionViewDidLoad() {
    this.prevPage = this.navCtrl.last().name;
  }
 
  ionViewWillEnter() {   
    this.tabBarElement.style.display = 'none';  
    if(this.global.network_status==2){
       this.network_status=2;    
     }else{
       this.network_status=1;
     } 

  }

  ionViewDidEnter() {
     window.setTimeout(() => {
          this.myInput.setFocus();
     }, 600);
  }

 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }


  // triggerNotification(){
  //      this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705');
  //      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  //      this.oneSignal.getIds().then((id) => {
  //        console.log(id.userId);
  //        localStorage.setItem("player_id", id.userId);
     
  //      });
  //      //this.oneSignal.setSubscription(true);
  //      this.oneSignal.handleNotificationReceived().subscribe((data) => {
  //      // handle received here how you wish.
  //      }); 
  //      this.oneSignal.handleNotificationOpened().subscribe((result) => { 
  //       this.assignPush = JSON.stringify(result.notification.isAppInFocus);
  //       this.getPushData = result.notification.payload.additionalData;
  //       localStorage.setItem("action", this.assignPush);

  //       if(localStorage.getItem("action") == 'false'){
            
  //       }else{
  //         console.log('focus',result)
  //         localStorage.setItem("noti_page", this.getPushData.action);
  //         if(this.getPushData.value!=undefined || this.getPushData.value!=null){
  //           localStorage.setItem("ViewDetails", this.getPushData.value.id);
  //           localStorage.setItem("noti_genre_id", this.getPushData.value.genre.id);
  //           localStorage.setItem("noti_genre_type", this.getPushData.value.genre.genre_type);
  //           if(localStorage.getItem("noti_page")=="home"){ 
  //            this.nav.setRoot('TabsPage',{tabIndex:0}) 
  //           }else{
  //            this.nav.setRoot('TabsPage',{tabIndex:3}) 
  //           }
  //         }else if(localStorage.getItem("noti_page")=="home"){
  //           this.nav.setRoot('TabsPage',{tabIndex:0}) 
  //         }else{
  //           this.nav.setRoot('TabsPage',{tabIndex:3})  
  //         }
  //       }   
  //      });
       
  //      this.oneSignal.endInit();       
  // }

  cancelSearch(){
   this.navCtrl.pop();  
  }


  onEnter(e){
    if (e.keyCode == 13) {
            let activeElement = <HTMLElement>document.activeElement;
            activeElement && activeElement.blur && activeElement.blur();
     }
    if(this.navCtrl.getPrevious().name=='HomePage'){
      this.keywords_list();
    }else{
      this.HistorySearch();
    }
    
  }
 
  keywords_list(){
   
    if(this.someValue.length>0){
     if(this.global.network_status==2){
      this.network_status=2; 
      this.SearchService.home_keywords_list(this.someValue)
      .subscribe(res=>{
          this.Search_keywords=res;
          this.display_details=1;
          if(this.Search_keywords.length == 0){
           this.display_details=3;
          }
         },error=>{   
      })
     }else{
       this.Search_keywords=[];
       this.display_details=1;
       this.network_status=1;
     }  
    }else{
      this.Search_keywords=[];
      this.display_details=0;
    }

  }

  keywords_details(keyword_name){
    if(this.global.network_status==2){
     this.SearchService.homeTopList(keyword_name)
     .subscribe(res=>{
       this.SearchOrder=res;
       this.display_details=2;
     },error=>{
     })
    }else{
      this.display_details=2;
      this.network_status=1;
    } 
  }

 
  HistorySearch(){
     this.SearchService.historyOrder(this.someValue,this.limit)
     .subscribe(res=>{
       this.SearchOrder=res;
       this.Template=true;      
     },error=>{
     })
  }

  public openModal(user,rank){
   if(this.global.network_status==2){ 
    localStorage.setItem("ViewDetails",user);
    localStorage.setItem("rank",rank);
    var data = { message : 'hello world' };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
    localStorage.setItem("pageNav",this.navCtrl.last().name);
    modalPage.onDidDismiss(() => {
          this.platform.ready().then(() => {  
           this.platform.registerBackButtonAction(() => {  
                this.navCtrl.pop();
           }, 0);
           //this.triggerNotification();
         })
    });
   }else{
     this.SearchOrder=[];
     this.network_status=1;
   }
  }

}
