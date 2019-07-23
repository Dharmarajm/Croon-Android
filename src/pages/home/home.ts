import { Component, ViewChild,ElementRef } from '@angular/core'; /*AfterViewInit, Renderer*/
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, App, Nav} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { ModalController,ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../providers/global';
import { NotificationProvider } from '../../providers/notification/notification';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { Slides } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   

   @ViewChild('myContent') myContent;

   public queryhome : string = 'music';

   public unregisterBackButtonAction: any;
   types:any;
   types_first:any;
   ID:any;
   isAvailable: Boolean = false;
   confirm:any;
   toggled: Boolean = false;
   someValue:any;
   setGenre:any[]=[];
   itemlength:number;
   enableRefresh:any;
   loadingMap:boolean;
   notify_count?:any;
   current_type_id:any;
   network_status:any;
   disconnectSubscription:any;
   connectSubscription:any;
   current_type:any;
   count_list:any;
   assignPush:any;
   getPushData:any;
   getSlide:any;
   modalPage:any;
   counter:number = 0;
   inScreenLoader:boolean = false;
   loading:any;
   ud_id:any;

   @ViewChild('mySlider') slider: Slides;
   selectedSegment: string;

  constructor(public app:App,public nav:Nav,public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public alertCtrl:AlertController, public modalCtrl : ModalController, public http: HttpClient,private Homeservice:HomeProvider,public global:Globals,public loadingCtrl: LoadingController, private notify: NotificationProvider,private network: Network,private oneSignal:OneSignal,public viewCtrl : ViewController,private toast: Toast) {
      platform.ready().then(() => { 
        platform.registerBackButtonAction(() => {
          if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => { this.counter = 0 }, 3000)
          } else {
            platform.exitApp();
          }
        }, 0);
        this.triggerNotification();
      })
     this.count_list=10;
     localStorage.removeItem("ProfileShow");
  }
  
  ionViewDidLoad() {   
    this.Network(this.current_type);
  }


   presentToast() {
    this.toast.show(`Press again to exit`, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
  }

  ionViewWillEnter(){
    this.global.current_page="HomePage";
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

  ionViewDidEnter(){ }

  triggerNotification(){
        
        this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d','812346685705');
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

          if(localStorage.getItem("action") == 'false'){
            localStorage.setItem("noti_page", this.getPushData.action);
           if(this.getPushData.value!=undefined || this.getPushData.value!=null){         
            localStorage.setItem("ViewDetails", this.getPushData.value.id);
            localStorage.setItem("noti_genre_id", this.getPushData.value.genre.id);
            localStorage.setItem("noti_genre_type", this.getPushData.value.genre.genre_type);
            if(localStorage.getItem("noti_page")=="home"){
              this.getSlide = { "genre_type":this.getPushData.value.genre.genre_type,"id":this.getPushData.value.id };
              this.genreClick(this.getSlide)
            }else{
              //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
              //this.nav.getActiveChildNav().select(3);
              this.nav.setRoot('TabsPage',{tabIndex:3}) 
            } 
           }else if(localStorage.getItem("noti_page")=="history"){
              //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
              //this.nav.getActiveChildNav().select(3);
              this.nav.setRoot('TabsPage',{tabIndex:3})
           }else{

           }
            
          }else{
            localStorage.setItem("noti_page", this.getPushData.action);
           if(this.getPushData.value!=undefined || this.getPushData.value!=null){
            localStorage.setItem("ViewDetails", this.getPushData.value.id);
            localStorage.setItem("noti_genre_id", this.getPushData.value.genre.id);
            localStorage.setItem("noti_genre_type", this.getPushData.value.genre.genre_type);
            if(localStorage.getItem("noti_page")=="home"){
             this.getSlide = { "genre_type":this.getPushData.value.genre.genre_type,"id":this.getPushData.value.id };  
             this.genreClick(this.getSlide)
            }else{
             //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
             //this.navCtrl.parent.select(3);
             //this.nav.getActiveChildNav().select(3);
             this.nav.setRoot('TabsPage',{tabIndex:3})
            }            
           }else if(localStorage.getItem("noti_page")=="history"){
             //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
             //this.navCtrl.parent.select(3);
             //this.nav.getActiveChildNav().select(3);
             this.nav.setRoot('TabsPage',{tabIndex:3})
           }else{

           }
          }
    
      });
      this.oneSignal.endInit();
       
  }

 
  
  onSegmentChanged(segmentButton) {   
    const selectedIndex = this.types.findIndex((slide) => {
      return slide.genre_type === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
   if(this.types.length>slider._activeIndex){
    const currentSlide = this.types[slider._activeIndex];
    this.setGenre=[];
    this.genreClick(currentSlide);
   }
  }

  Network(status?){   
      if(localStorage.getItem("noti_genre_type")!=undefined){
        this.current_type=localStorage.getItem("noti_genre_type");
        this.getSlide = { "genre_type":localStorage.getItem("noti_genre_type"),"id":localStorage.getItem("noti_genre_id")};
        this.inScreenLoader = true;
        this.Homeservice.home_type_first()
                .subscribe(

                res => {                    
                    this.network_status=2;
                    this.global.network_status=2;
                    this.types_first=res;
                            this.Homeservice.home_type()
                            .subscribe(
                            res => {
                                this.types=res;
                               for(let i=0; i < Object.keys(this.types).length;i++){                                     
                                  if(this.types[i].genre_type == this.getSlide.genre_type){
                                    this.genreClick(this.getSlide);
                                  }
                                }
                            },
                            error => {
                                this.inScreenLoader = false;
                                console.log(error);
                            });                    
                },
                error => {
                    this.inScreenLoader = false;
                    this.types=[]; 
                    this.network_status=1;
                    this.global.network_status=1;
                    console.log(error);
         });
      }else if(this.types_first==undefined || this.types_first==null){
          this.inScreenLoader = true;
          this.Homeservice.home_type_first()
                .subscribe(
                res => {
                    
                    this.network_status=2;
                    this.global.network_status=2;
                    this.types_first=res;
                            this.Homeservice.home_type()
                            .subscribe(
                            res => {
                                this.types=res;
                               for(let i=0; i < Object.keys(this.types).length;i++){                                     
                                  if(this.types[i].genre_type == this.types_first.genre_type){
                                    this.genreClick(this.types_first);
                                  }
                                }
                            },
                            error => {
                                this.inScreenLoader = false;
                                console.log(error);
                            });
                    
                },
                error => {
                    this.inScreenLoader = false;
                    this.types=[]; 
                    this.network_status=1;
                    this.global.network_status=1;
                    console.log(error);
         });

      }else if(this.types==undefined || this.types==null){
        this.inScreenLoader = true;
        this.Homeservice.home_type()
            .subscribe(
            res => {               
               this.network_status=2;
               this.global.network_status=2;
               this.types=res;
               for(let i=0; i < Object.keys(this.types).length;i++){                     
                  if(this.types[i].genre_type == this.types_first.genre_type){
                    this.genreClick(this.types_first);
                  }
                }
            },
            error => {
                this.inScreenLoader = false;
                this.types=[];
                this.network_status=1;
                this.global.network_status=1;
                console.log(error);
            });
      }else{
        this.genreClick(this.types_first)
      }     
   
  }


  doInfinite(infiniteScroll) {    
           setTimeout(() => {            
            if(this.global.network_status==2){
              this.network_status=2;
              this.count_list=this.count_list+10;
                this.Homeservice.homeGenre_limit(this.ID,this.count_list)
                 .subscribe(res=>{
                   this.setGenre=res;
                   infiniteScroll.complete();                
                 },error=>{
                   console.log(error)
                 })
            }else{
              infiniteScroll.complete();
            }       
    }, 500);        
  }
 
  
  public openModal(user,rank){

    if(this.global.network_status==2){
    this.network_status=2; 
    localStorage.setItem("ViewDetails",user);
    localStorage.setItem("which_page","Homepage")
    localStorage.setItem("rank", rank);
    var data = { message : 'hello world' };
    this.modalPage = this.modalCtrl.create('ModalPage',data);
    this.modalPage.onDidDismiss(() => {

           this.platform.ready().then(() => {           
            this.platform.registerBackButtonAction(() => {
              if (this.counter == 0) {
                this.counter++;
                this.presentToast();
                setTimeout(() => { this.counter = 0 }, 3000)
              } else {
                this.platform.exitApp();
              }
            }, 0);
            this.triggerNotification();
          })


     this.global.modalActive = false; 
     this.Homeservice.homeGenre_limit(this.ID,this.count_list)
     .subscribe(res=>{
       this.setGenre=res;
       if(localStorage.getItem("noti_genre_type")!=undefined){
         let user = localStorage.getItem("ViewDetails");
         this.openModal(user,rank);
       }
     },error=>{       
       console.log(error)
     })
    });
    this.modalPage.present().then(() => {
      this.global.modalActive = true;
    });;
   }else{
     this.setGenre=[];
     this.network_status=1;
   }  
  }
  
  
  notification(){
    this.navCtrl.push('NotificationPage');
  }

  cancelSearch(event){
   this.someValue="";
   this.toggled = false;
   this.getGenre();
  }

 
  toggle() {
     this.navCtrl.push('SearchPage')
  }

  getGenre(){   
    this.inScreenLoader = true;               
    this.Homeservice.homeGenre_limit(this.ID,this.count_list)
     .subscribe(res=>{     
         this.inScreenLoader = false;  
       this.setGenre=res;
       this.network_status=2;
       
       this.global.network_status=2;
       if(localStorage.getItem("noti_genre_type")!=undefined){
         if(this.global.modalActive==true){
           this.modalPage.dismiss();   
         }
         let user = localStorage.getItem("ViewDetails");
         let rank = localStorage.getItem("rank");
         this.openModal(user,rank);
       }
     },error=>{
       this.setGenre=[];
       this.network_status=1;
       this.global.network_status=1;    
         this.inScreenLoader = false;      
       console.log(error)
     })
     
  }
  
  genreClick(slider,i?){
    this.types_first=slider;
     if(i!=undefined || i!=null){
      this.slider._activeIndex=i;
     }   
     this.setGenre=[];
     this.current_type=slider.genre_type;
     this.selectedSegment=slider.genre_type;
     this.count_list=10;
     this.ID=slider.id;
     this.getGenre();     
   }
 
  searchHome(){
     if(this.someValue!=undefined){
       this.toggled = false;
       this.Homeservice.homeSearch(this.ID,this.someValue)
       .subscribe(res=>{
         this.someValue="";
         this.setGenre=res;
       },error=>{
         console.log(error)
       })
     } 
  }

}




