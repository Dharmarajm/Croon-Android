import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, Nav,NavParams, App } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Globals } from '../../providers/global';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { VotesProvider } from '../../providers/myvotes/myvotes';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon?: string;
  
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

	rootPage = 'TabsPage';
  user_id:any;
  user_image:any;
  user_name?:any;
  store_id:any;
  uploadlist:any;
	@ViewChild(Nav) nav: Nav; 

  pages: PageInterface[]; 

  hatId:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast: Toast,public global:Globals,public app:App,private facebook: Facebook,private googlePlus: GooglePlus, public upload: VotesProvider) {
     if(localStorage.getItem("user_id")!=null){
        this.user_id = localStorage.getItem("user_id");
        if(localStorage.getItem("user_image")!=null){
          this.user_image = localStorage.getItem("user_image");
        }
        if(localStorage.getItem("user_name")!=null){
         this.user_name = localStorage.getItem("user_name");
        }else{
          this.user_name= '';
        }
      }
  }
   
  ionViewDidLoad() {
    
        this.pages = [
            { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0,icon: 'ios-home-outline'},
            { title: 'Settings', pageName: 'SettingsPage',icon: 'ios-settings-outline'},
            { title: 'About', pageName: 'AboutPage',icon: 'ios-information-circle-outline'},
            { title: 'Login', pageName: 'LoginPage',icon: 'ios-log-in-outline'},        
            { title: 'Logout', pageName: 'TabsPage', tabComponent: 'HomePage', icon: 'ios-power'},
            { title: 'Change Password', pageName: 'ChangepasswordPage',icon: 'ios-unlock-outline'},
            { title: 'Profile', pageName: 'ProfilePage',icon: 'ios-contact-outline'}                
        ];

      if(this.user_id!=null){
        this.upload.uploaddisp(this.user_id).subscribe(res=>{
           this.uploadlist=res.length;
        },error=>{
           console.log(error)
        })
      }else{
        this.uploadlist=0;
      }
  } 


  upload_count(){
    if(this.user_id!=null){
        this.upload.uploaddisp(this.user_id).subscribe(res=>{
           this.uploadlist=res.length;
        },error=>{
           console.log(error)
        })
      }else{
        this.uploadlist=0;
      }
  }

  openPage(page: PageInterface) {

    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      
      this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
    if(page.title=='Logout'){    
      this.user_id=null;
      localStorage.removeItem("Rank");
      localStorage.removeItem("ViewDetails");
      localStorage.removeItem("pageNav");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_image");
      localStorage.removeItem("user_name");
      localStorage.removeItem("uploadpage");
      if(localStorage.getItem("login_status")=='google'){
       localStorage.removeItem("login_status");
       this.googlePlus.logout()
       .then(res => {
       }).catch(err => console.error(err));
      }else if(localStorage.getItem("login_status")=='facebook'){
       localStorage.removeItem("login_status");
       this.facebook.logout()
       .then(res => {
         console.log(res);       
       }).catch(err => console.error(err));
      }
       
      this.toast.show(`You have logged out successfully`, '2000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }

      if(this.user_id!=null){this.upload.uploaddisp(this.user_id).subscribe(res=>{
           this.uploadlist=res.length;
        },error=>{
           console.log(error)
        })
      }else{
        this.uploadlist=0;
      }

  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    } 
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

  goto_login(){
    this.navCtrl.setRoot('LoginPage');
  }

  goto_myvotes(){
    this.nav.getActiveChildNav().select(2);
  }

  goto_myupload(){
    localStorage.setItem("uploadpage","myupload")
    //this.nav.getActiveChildNav().select(1);
    this.nav.setRoot('TabsPage',{tabIndex:1}) 
  }

}
