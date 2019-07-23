import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, App, Nav} from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { Globals } from '../../providers/global';
import { NotificationProvider } from '../../providers/notification/notification';
import { Network } from '@ionic-native/network';
import { Slides } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage{


 // @ViewChild('input') myInput;
  
  public queryhistory : string = 'music';
  toggled: Boolean = false;
  someValue:any;
  Current:any;
  start_end_dates:any;
  start_date:any;
  end_date:any;
  history_music_values:any;
  types:any;
  types_first:any;
  genre_id:any;
  dates_id:any;
  history_music_Result:any;
  isenabled:boolean=false;
  ud_id:any;

  btnColor_pre: string = '#002b3d';
  btnColor_next: string = '#002b3d';

  colors_pre:string='#ffffff';
  colors_next:string='#ffffff';
  notify_count?:any;

  network_status:any;
  disconnectSubscription:any;
  connectSubscription:any;

  current_type:any;
  current_type_id:any;
  count_list:any;

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  assignPush:any;
  getPushData:any;
  getSlide:any;
  modalPage:any;
  counter:number = 0;
  inScreenLoader:boolean=false;
  first:boolean;
  endtempdate:any;
  starttempdate:any;

  constructor(public app:App,public nav: Nav,public platform:Platform,public navCtrl: NavController,public service:HistoryProvider,public navParams: NavParams,public modalCtrl : ModalController,public global:Globals,public loadingCtrl: LoadingController,public alertCtrl:AlertController,public toastCtrl: ToastController, private notify: NotificationProvider,private network: Network,private oneSignal:OneSignal,public viewCtrl : ViewController,private toast: Toast) {  
     platform.ready().then(() => {          
         platform.registerBackButtonAction(() => {
          if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => { this.counter = 0 }, 3000)
          } else {
            // console.log("exitapp");
            platform.exitApp();
          }
        }, 0);
        this.triggerNotification();
      })
     this.count_list=10;    
   
 }

  

  ionViewDidLoad() {
    this.first=true;    
    this.Network(this.current_type)
    
  }

  ionViewWillEnter(){
    this.endtempdate=localStorage.getItem('endTmpDate');
    this.starttempdate=localStorage.getItem('startTmpDate');
    
   if(this.global.network_status==2){
    this.network_status=2;
    this.global.current_page="HistoryPage";
    this.ud_id = localStorage.getItem("storeID");
    if(this.ud_id!=null){
      this.notify.notificationCount(this.ud_id).subscribe(res => {
        this.notify_count =  res._body;
      },
      error => {
        console.log(error);
      });
    }
    
   
    if(this.types!=undefined){
       if(this.types.length==0 && this.first==false && localStorage.getItem("noti_genre_type")==undefined){
        this.network_status=1;
       }
    }

    if(this.types==undefined && this.first==false){
      this.Network(this.current_type)
    }
    
   }else{
    this.network_status=1;
    this.history_music_Result=[];
    this.history_music_values=[];
   } 

   if(this.first==true){
     this.first=false;
   } 

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
        console.log('trigger')
        this.triggerNotification();
      })

  }

  ionViewDidEnter() {
      this.btnColor_pre = '#002b3d';
      this.btnColor_next = '#002b3d'; 

      this.colors_pre = '#ffffff';
      this.colors_next = '#ffffff';
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
              if(localStorage.getItem("noti_page")=="history"){ 
               this.getSlide = { "genre_type":this.getPushData.value.genre.genre_type,"id":this.getPushData.value.id };  
               this.type(this.getSlide)
              }else{
               this.nav.setRoot('TabsPage',{tabIndex:0}) 
              }
            }else if(localStorage.getItem("noti_page")=="home"){
               this.nav.setRoot('TabsPage',{tabIndex:0}) 
            }else{

            } 
          /*}*/
    
      });
      this.oneSignal.endInit();
      
  }

  presentToast() {
    this.toast.show(`Press again to exit`, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
  }

  Network(status?){   
     if(localStorage.getItem("noti_genre_type")!=undefined){
        this.current_type=localStorage.getItem("noti_genre_type");
          this.service.history_type_first().subscribe(res => {
                this.network_status = 2;
                this.types_first=res;              
                this.function_switch(1);                
           },
           error => {
            this.network_status = 1;
            console.log(error);
          });
      }else if(this.types_first==undefined || this.types_first==null){        
         this.service.history_type_first()
           .subscribe(
            res => {
                this.network_status = 2;
                this.types_first=res;               
                this.function_switch(1);                
            },
            error => {
                this.network_status = 1;
                this.types=[];
                console.log(error);
            });
      }else if(this.types==undefined || this.types==null){
        this.function_switch(1);  
      }else{
        this.function_switch(1);
      }   

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
    this.history_music_Result=[];
    this.history_music_values=[];
    this.type(currentSlide);      
   }
  }

   doInfinite(infiniteScroll) {
     
    setTimeout(() => {
     if(this.global.network_status==2){
      this.network_status=2; 
       this.service.history_dates()
                .subscribe(
                res => {

                      this.start_end_dates=res;
                      this.Current=Object.keys(this.start_end_dates).length;                   
                      this.start_date=this.start_end_dates[0].start_date;
                      this.end_date=this.start_end_dates[0].end_date;
                      this.dates_id=this.start_end_dates[0].id;
                      this.genre_id=this.current_type_id;
                       this.count_list=this.count_list+10;
                                            
                      this.service.history_music_details_limit(this.dates_id,this.genre_id,this.count_list)
                        .subscribe(
                          res => {       
                          infiniteScroll.complete();  
                                  
                            this.history_music_values=res; 
                            if(Object.keys(this.history_music_values).length == 0){
                              this.history_music_Result=Object.keys(this.history_music_values).length;
                            }else{
                              this.history_music_Result=Object.keys(this.history_music_values).length;
                            }       
                          },
                          error => {
                              console.log(error);
                          });                                           
                       
                },
                error => {
                    console.log(error);                    
                });             
      }else{
        infiniteScroll.complete(); 
      } 
    }, 500); 
  }

        function_switch(grade){
          switch(grade) { 
             case 1: { 
                // getting the dates of id 
                this.inScreenLoader = true;
                this.service.history_dates()
                .subscribe(
                res => {
                        this.network_status=2;
                        this.start_end_dates=res;
                        this.Current=Object.keys(this.start_end_dates).length;
                        this.start_date=res[0].start_date;
                        localStorage.setItem('startTmpDate',res[this.Current-1].start_date);
                        this.end_date=res[0].end_date;
                        localStorage.setItem('endTmpDate',this.end_date);
                        this.starttempdate=localStorage.getItem('startTmpDate');
                        this.endtempdate=localStorage.getItem('endTmpDate');
                        this.dates_id=res[0].id;
                        this.function_switch(2);                     
                },
                error => {
                    this.network_status = 1;
                    this.inScreenLoader = false;
                    console.log(error);                    
                });              

                break; 
              }
             case 2: { 
                  // getting the type of id
                  this.service.history_type()
                    .subscribe(
                    res => {
                        this.types=res;

                        for(let i=0; i < Object.keys(this.types).length;i++){          
                         if(this.current_type!=undefined || this.current_type!=null){
                           if(this.types[i].genre_type == this.current_type){
                            this.genre_id=this.types[i].id;
                            this.current_type=this.types[i].genre_type;
                            this.current_type_id=this.types[i].id;
                            this.selectedSegment=this.types[i].genre_type;
                            this.function_switch(3);
                          } 
                         }else{
                           if(this.types[i].genre_type == this.types_first.genre_type){
                            this.genre_id=this.types_first.id;
                            this.current_type=this.types_first.genre_type;
                            this.current_type_id=this.types_first.id;
                            this.selectedSegment=this.types_first.genre_type;
                            this.function_switch(3);
                          }
                         } 
                          
                        }
                    },
                    error => {
                        console.log(error);
                        this.inScreenLoader = false;
                    });
                break; 
             } 
             case 3:{
                //let loading = this.loadingCtrl.create({
                //  content: 'Please wait...'
                //});

                //loading.present();       

                 // getting details
                 this.service.history_music_details_limit(this.dates_id,this.genre_id,this.count_list)
                  .subscribe(
                    res => {         
                     // loading.dismiss();          
                      this.history_music_values=res;
                      this.inScreenLoader = false;          
                      if(Object.keys(this.history_music_values).length == 0){
                        this.history_music_Result=Object.keys(this.history_music_values).length;
                      }else{
                        this.history_music_Result=Object.keys(this.history_music_values).length;
                      }
                      if(localStorage.getItem("noti_genre_type")!=undefined){
                       let user = localStorage.getItem("ViewDetails");
                       let rank = localStorage.getItem("rank");
                       this.openModal(user,rank);
                      }       
                    },
                    error => {
                       // loading.dismiss(); 
                        console.log(error);
                        this.inScreenLoader = false;
                        /*let alert = this.alertCtrl.create({
                          title: `Server error`,
                          message: `There are issues connecting to Croon.please try again later.`,
                          buttons: ['Ok']
                        });
                        alert.present();*/
                    });
                break;
             }    
             default: { 
                console.log("Invalid choice"); 
                break;              
             } 
          }
        }



  previous(name){
    if(this.global.network_status==2){
      this.network_status=2;

      this.inScreenLoader = true;  
      this.history_music_Result=[];
      this.history_music_values=[]; 
      this.btnColor_pre = '#fccb2b';
      this.btnColor_next = '#002b3d';

      this.colors_pre = '#002b3d';
      this.colors_next = '#ffffff';

      this.isenabled=true;

      this.service.history_paticular_dates(name,this.start_date)
      .subscribe(
        res => {   
          
          this.start_end_dates=res;
          if(this.start_end_dates!= null){    
            this.start_date=this.start_end_dates.start_date;
            this.end_date=this.start_end_dates.end_date; 
            this.dates_id=this.start_end_dates.id; 
                 
                 if(localStorage.getItem('startTmpDate')==this.start_date){
                  this.btnColor_pre = '#002b3d';
                  this.colors_pre = '#ffffff';
                 }
                  this.service.history_music_details_limit(this.dates_id,this.genre_id,this.count_list)
                  .subscribe(
                    res => {  
                      this.history_music_values=res;   
                      this.inScreenLoader = false;       
                      if(Object.keys(this.history_music_values).length == 0){
                        this.history_music_Result=Object.keys(this.history_music_values).length;
                      }else{
                        this.history_music_Result=Object.keys(this.history_music_values).length;
                      }     
                    },
                    error => {
                        this.inScreenLoader = false;
                        console.log(error);                      
                    });
          }            
        },
        error => {
            console.log(error);
            this.inScreenLoader = false;
        });     
    }else{
      this.network_status=1;
      this.history_music_Result=[];
      this.history_music_values=[];
    }       
  }


  next(name){
   if(this.global.network_status==2){
      this.network_status=2;
      
      this.inScreenLoader = true;         
      this.history_music_Result=[];
      this.history_music_values=[];
      this.btnColor_pre = '#002b3d';
      this.colors_pre = '#ffffff';

      this.btnColor_next = '#fccb2b'; 
      this.colors_next = '#002b3d';
      
      
      this.service.history_paticular_dates(name,this.start_date)
      .subscribe(
        res => {        
          this.start_end_dates=res;    
          if(this.start_end_dates!= null){
            this.start_date=this.start_end_dates.start_date;
            this.end_date=this.start_end_dates.end_date;

            if(localStorage.getItem('endTmpDate')==this.end_date){
              this.btnColor_next = '#002b3d';
              this.colors_next = '#ffffff';

            }
            this.dates_id=this.start_end_dates.id; 

                     this.service.history_music_details_limit(this.dates_id,this.genre_id,this.count_list)
                      .subscribe(
                        res => {   
                            this.history_music_values=res;      
                            this.inScreenLoader = false;    
                            if(Object.keys(this.history_music_values).length == 0){
                              this.history_music_Result=Object.keys(this.history_music_values).length;
                            }else{
                              this.history_music_Result=Object.keys(this.history_music_values).length;
                            }          
                        },
                        error => {
                            console.log(error);
                            this.inScreenLoader = false;                           
                        });
          }             
        },
        error => {
            console.log(error);
            this.inScreenLoader = false; 
        }); 

    }else{
      this.network_status=1;
      this.history_music_Result=[];
      this.history_music_values=[];
    }
  }

 
  type(slider,i?){
    this.types_first=slider;
    if(i!=undefined || i!=null){
     this.slider._activeIndex=i;  
    }
   
    this.history_music_values=[];
    this.current_type=slider.genre_type;
    this.current_type_id=slider.id;
    this.selectedSegment=slider.genre_type;
    this.count_list=10;
    this.genre_id=slider.id
    this.toplist(); 
  }   




  toplist(){
    if(this.global.network_status==2){
       this.network_status=2;
       this.inScreenLoader = true;
        this.service.history_music_details_limit(this.dates_id,this.genre_id,this.count_list)
          .subscribe(
            res => {   
              this.inScreenLoader = false;
              this.history_music_values=res;          
              if(Object.keys(this.history_music_values).length == 0){
                this.history_music_Result=Object.keys(this.history_music_values).length;
              }else{
                this.history_music_Result=Object.keys(this.history_music_values).length;
              }
              if(localStorage.getItem("noti_genre_type")!=undefined){
                if(this.global.modalActive==true){
                  this.modalPage.dismiss();   
                }
                let user = localStorage.getItem("ViewDetails");
                let rank = localStorage.getItem("rank");
                this.openModal(user,rank);
              }         
            },
            error => {
                this.inScreenLoader = false;
                this.history_music_values=[];
                console.log(error);
            });
    }else{
     this.history_music_values=[];
     this.history_music_Result=[];
     this.network_status=1;
    }          
  }


  cancelSearch(event){
   this.someValue="";
   this.toggled = false;
   this.function_switch(1);
  }


  toggle() {
     this.navCtrl.push('SearchPage')
  }
 

  public openModal(user,rank){

   if(this.global.network_status==2){
    this.network_status=2;  
    localStorage.setItem("ViewDetails",user);
    localStorage.setItem("which_page","Historypage")
    localStorage.setItem("rank",rank);
    

    //localStorage.setItem("Rank",id);
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


      this.global.modalActive==false;
      this.service.history_music_details_limit(this.dates_id,this.genre_id,this.count_list).subscribe(res => {  
          this.history_music_values=res;          
          if(Object.keys(this.history_music_values).length == 0){
          this.history_music_Result=Object.keys(this.history_music_values).length;
      }else{
          this.history_music_Result=Object.keys(this.history_music_values).length;
        }     
      },
      error => {
          console.log(error);      
      });
    });
    this.modalPage.present().then(() => {
      
      this.global.modalActive = true;
    });;
   }else{
     this.history_music_values=[];
     this.history_music_Result=[];
     this.network_status=1;
   } 
  }


  notification(){
    this.navCtrl.push('NotificationPage');
  }

 
  CheckNetwork(){
    if(this.current_type==null || this.current_type==undefined){
      this.Network();
    }else{
      this.type(this.types_first,this.slider._activeIndex);
    }
  }
  
}
 
  

