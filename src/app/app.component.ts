import { Component, ViewChild } from '@angular/core';
import { Platform , App, AlertController, Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { HockeyApp } from 'ionic-hockeyapp';
import { MenuPage } from '../pages/menu/menu';
import { Globals } from '../providers/global';
import { Network } from '@ionic-native/network';
//import { Deeplinks } from '@ionic-native/deeplinks';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MenuPage;
  //ViewChild('myNav') nav: NavController
  public counter=0;


   @ViewChild(Nav) naV:Nav;


  constructor(public platform: Platform,statusBar: StatusBar,public splashScreen: SplashScreen, app:App, public alertCtrl: AlertController,public global:Globals,private network: Network,private androidPermissions: AndroidPermissions, private toast: Toast, private file: File,private oneSignal:OneSignal) { // hockeyapp:HockeyApp,
    
    platform.ready().then(() => {	 

      // this.deeplinks.routeWithNavController(this.nav,{
      //     '/hats/:hatId': MenuPage
      // }).subscribe((match) => {
        
      // }, (nomatch) => {
        
      // });
      
      //console.log(this.nav.getActive().name);
      /* platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 2000)
        } else {
          // console.log("exitapp");
          platform.exitApp();
        }
      }, 0)
*/
    // The Android ID of the app as provided by the HockeyApp portal. Can be null if for iOS only.
    /*let androidAppId = '3f6000180b044597b1f44364fef8b3a0';
    // The iOS ID of the app as provided by the HockeyApp portal. Can be null if for android only.
    let iosAppId = 'cdbaa6ede0d94964bb6c443bd2accce3';
    // Specifies whether you would like crash reports to be automatically sent to the HockeyApp server when the end user restarts the app.
    let autoSendCrashReports = false;
    // Specifies whether you would like to display the standard dialog when the app is about to crash. This parameter is only relevant on Android.
    let ignoreCrashDialog = true;
     
    hockeyapp.start(androidAppId, iosAppId, autoSendCrashReports, ignoreCrashDialog);*/
    
    
     
      this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d','812346685705');
   
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      
      this.oneSignal.setSubscription(true);
      
      this.oneSignal.getIds().then((id) => {
       localStorage.setItem("player_id", id.userId);
      });

      this.oneSignal.endInit();
     
    androidPermissions.requestPermissions([
      androidPermissions.PERMISSION.CAMERA, 
      androidPermissions.PERMISSION.RECORD_AUDIO,
      androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS, 
      androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
      androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
     ]);



        network.onDisconnect().subscribe(() => {
         this.global.network_status=1;
         localStorage.removeItem("noti_page");
         localStorage.removeItem("noti_genre_id");
         localStorage.removeItem("noti_genre_type");
        });

        network.onConnect().subscribe(() => { 
         this.global.network_status=2;
        }) 
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#01222d');
      splashScreen.hide();
    
   })
    
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      // do whatever you need to do here.
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    });
  }

  presentToast(){
    this.toast.show(`Press again to exit`, '2000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}

