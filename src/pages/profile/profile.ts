import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController,App ,Nav} from 'ionic-angular';
//import { LoginPage } from './../login/login';
import { MenuPage } from '../menu/menu';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { VotesProvider } from '../../providers/myvotes/myvotes';
import { Toast } from '@ionic-native/toast';
import { Globals } from '../../providers/global';
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  

  image: any;
  imgPreview?:any;
  loading: any;
  prof_name:any;
  name: any;
  data:any;
  page: any;
  user_image:any;
  assignPush:any;
  getPushData:any;
  ShowBack:boolean=true;

  constructor(public app:App,public nav:Nav,public navCtrl: NavController, public navParams: NavParams,public platform:Platform, public votes: VotesProvider, private imagePicker: ImagePicker, private base64: Base64, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public menu: MenuPage,private toast: Toast, public global: Globals,private oneSignal:OneSignal) {

      if(localStorage.getItem("ProfileShow")=='true'){
         this.ShowBack=false;
      }else{
         this.ShowBack=true;
         
      }

      platform.ready().then(() => {        
        platform.registerBackButtonAction(() => {
         if(this.ShowBack==true){
           this.navCtrl.setRoot(MenuPage);  
         }
        }, 0);
        this.triggerNotification();
      }) 
     if(localStorage.getItem("user_image")!= null){
      
      this.imgPreview = localStorage.getItem("user_image");
      this.user_image = this.imgPreview;
     }else{
      
      this.imgPreview = "assets/imgs/profileIcon.jpg";
      this.user_image = null;
    }
    if(localStorage.getItem('user_name')!= 'null'){
      this.prof_name = localStorage.getItem('user_name');
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
         /* }*/
    
      });
      this.oneSignal.endInit();
       
      //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1,
      quality: 90,
        width: 500, 
        height: 500
    };
    this.imagePicker.getPictures(options).then((results) => {
      //this.user_image = null;
      if(results.length!=0){
        for (var i = 0; i < results.length; i++) {
        
          this.imgPreview = results[i];
          this.user_image = null; 
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.image = base64File;
          }, (err) => {
            console.log(err);
          });
        }
       }else{
          if(this.user_image!=null){
            this.imgPreview = localStorage.getItem("user_image");
          }else{
            this.user_image = null;
          }   
       }  
         
    }, (err) => {console.log(err)});
  }

  dashboard(){
    this.name = this.prof_name;
    if(this.image != "" ){

          let data = {
              "image": this.image,
              "user_id": localStorage.getItem("user_id"),
              "user_name": this.name 
          }
          this.showLoader();
          this.votes.register(data).subscribe((result) => {
            let data = result;
            this.loading.dismiss();
            if(data.image.length!=0){
                localStorage.setItem("user_image", data.image[0].image_path.url);
            }
            localStorage.setItem("user_name", data.first_name);
            this.menu.user_id = data.id;
                  this.menu.user_name = data.first_name;
                  if(data.image.length!=0){
                  this.menu.user_image = data.image[0].image_path.url;
            }
            this.toast.show(`Uploaded successfully`, '2000', 'bottom').subscribe(
              toast => {
                  console.log(toast);
              }
            );

          }, (err) => {
            this.loading.dismiss();
            this.toast.show(`Uploading Failed`, '2000', 'bottom').subscribe(
              toast => {
                console.log(err);
              }
            );
          });
          }
          this.navCtrl.setRoot(MenuPage);
  }

  back(){
   this.navCtrl.setRoot(MenuPage); 
  }


  showLoader(){
  this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
  });

  this.loading.present();
  }

}
