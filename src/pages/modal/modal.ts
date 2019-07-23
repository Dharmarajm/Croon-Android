import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ModalController, ViewController,ActionSheetController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { ViewProvider } from '../../providers/view/view';
import { Globals } from '../../providers/global';
import { HomeProvider } from '../../providers/home/home';
import { Media, MediaObject } from '@ionic-native/media';
import { DatePipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  UserDetails:any; 
  ID:number; 
  setCmts:any;
  Comments:any;
  voteIcon:boolean; 
  userId:any;
  network_status:any;
  viewDetail:any;
  Page_status:any;
  count_list:any;
  user_rank:any;
  myDate:any;
  Date:any;
  audioFile:MediaObject;
  currentTrack:any = { playing: false };
  audioState:boolean= false;
  updateddate:any;
  detailsScreenLoader:boolean=false;
  commentsScreenLoader:boolean=false;
  Reports:any=[{'id':1,'report':'Sexual content'},{'id':2,'report':'Violent or repulsive content'},{'id':3,'report':'Hateful or abusive content'},{'id':4,'report':'Harmful dangerous acts'},{'id':5,'report':'Child abuse'},{'id':6,'report':'Infringes my rights'},{'id':7,'report':'Promotes terrorism'},{'id':8,'report':'Spam or misleading'}];
  reportName:any;
  ReportId:number;
  infinite_count:any;
  readMore:boolean=true;
  text:string='more';
  //test:string='Breaking India: Western Interventions fdgfsfdgds'
  voteClick:boolean=false;

  constructor(public navCtrl: NavController, public actionSheetCtrl:ActionSheetController, public navParams: NavParams,public platform:Platform, private socialSharing: SocialSharing, public viewCtrl : ViewController, public modalCtrl : ModalController,private viewservice:ViewProvider,public toastCtrl: ToastController, public alertCtrl:AlertController,public global:Globals,public homeservice:HomeProvider,private datePipe: DatePipe,private toast: Toast,private media: Media,) {

  	this.count_list=10;    
    this.UserDetails = localStorage.getItem("ViewDetails");
    this.Page_status = localStorage.getItem("which_page");
    this.global.modalActive=true; 
    
    if(localStorage.getItem("user_id")!=null){
     this.userId=localStorage.getItem("user_id");
    }else{
     this.userId=null; 
    }

     platform.registerBackButtonAction(() => {       
       this.viewCtrl.dismiss();
      }, 0);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    this.user_rank= localStorage.getItem("rank")
    //console.log(this.user_rank)
    let user=this.UserDetails;
    this.allupload_details(user)
    if(this.global.network_status == 2){
      this.network_status=2;
      this.getCmts();
      this.voteStatus();
    }else{
      this.network_status=1;
    }
  }


  Network(){
     if(this.global.network_status == 2){
      this.network_status=2;
      this.getCmts();
      this.voteStatus();
    }else{
      this.network_status=1;
    }
  }

  network_check(){
     if(this.global.network_status == 2){
      this.network_status=2;   
    }else{
      this.network_status=1;
    }
  }

  ionViewWillLeave(){
    this.global.modalActive=false;
    localStorage.removeItem("noti_page");
    localStorage.removeItem("noti_genre_id");
    localStorage.removeItem("noti_genre_type");
    if(this.currentTrack.playing==true){
      this.currentTrack.playing=false;
      this.audioState=false;
      this.audioFile.stop();
      this.audioFile.release(); 
    }
    if(this.audioState==true){
      this.audioState=false;
      this.audioFile.stop();
      this.audioFile.release();
    }
  }


  commants_date(data){
    this.myDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    this.updateddate = this.datePipe.transform(data,'yyyy-MM-dd');
      if(this.myDate == this.updateddate){
         return data;
      }  
  }

  public closeModal(){
    this.viewCtrl.dismiss();
    this.global.modalActive=false;
    localStorage.removeItem("noti_page");
    localStorage.removeItem("noti_genre_id");
    localStorage.removeItem("noti_genre_type");
    if(this.currentTrack.playing==true){
      this.currentTrack.playing=false;
      this.audioState=false;
      this.audioFile.stop();
      this.audioFile.release(); 
    }
    if(this.audioState==true){
      this.audioState=false;
      this.audioFile.stop();
      this.audioFile.release();
    }

  }


  compilemsg(index):string{
      //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      var msg = "Hi i am Crooner";
      return msg.concat(" \n Sent from Croon App !");
  }



  regularShare(index){
   this.socialSharing.share(this.global.shareUrl+'genres/croon_share?id='+this.UserDetails);
    //this.socialSharing.share("Check this item:  croon://home/",null,null,null)
  }

  
  disablecomment(){
     if(localStorage.getItem("user_id")!=null){
      
     }else{
       let toast = this.toastCtrl.create({
        message: 'Login to your Croon account',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
     }
  }
  
  allupload_details(user){
    this.detailsScreenLoader=true;
    this.homeservice.model_upload(user).subscribe(res=>{
      this.viewDetail=res[0];
      this.detailsScreenLoader=false;
     },error=>{
       console.log(error)
       this.detailsScreenLoader=false;
     })
  }


  updateVote(){
    if(localStorage.getItem("which_page") == 'Uploadpage' || localStorage.getItem("which_page") == 'Homepage'){
         if(localStorage.getItem("user_id")!=null){
              this.voteClick=true;
              let data={
                      "user_id": this.userId,
                      "upload_id": this.UserDetails
                     }
            this.viewservice.voteUpdate(data)
             .subscribe(res=>{
                 this.voteClick=false;
                 if(res._body=='vote'){
                  this.voteIcon=true;  
                  this.viewDetail.votes.length=this.viewDetail.votes.length+1; 
                 }else if(res._body=='unvote'){
                  this.voteIcon=false;
                  this.viewDetail.votes.length=this.viewDetail.votes.length-1;     
                 }else{

                 }
             },error=>{
               this.voteClick=false;
               console.log(error)
             })  
          }else{  
              let toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
          }
      
    }
  }

  getCmts(){
    this.commentsScreenLoader=true;
    this.viewservice.getComments_limit(this.UserDetails,this.count_list)
     .subscribe(res=>{
       this.commentsScreenLoader=false;
       if(res==null || res==[]){
         this.setCmts=[];
       }else{
         this.setCmts=res;  
           if(this.setCmts.length == this.count_list){
             this.infinite_count=1;
           }else{                     
             this.infinite_count=2;
           }
       }      

     },error=>{
       console.log(error)
       this.commentsScreenLoader=false;
     })
  }

  uploadCmts(){
     let data={
                "user_id": this.userId,
                "upload_id": this.UserDetails,
                "message":this.Comments 
              };
     this.Comments =""; 
     this.viewservice.uploadCmts(data)
     .subscribe(res=>{
       if(res.id!=null){
         
         this.getCmts();
       }else{
         console.log('Comments updated is failed')
       }
     },error=>{
       console.log(error)
     })
  }

   voteStatus(){
     this.viewservice.Votestatus(this.userId,this.UserDetails)
     .subscribe(res=>{
       if(res==true){
          this.voteIcon=true;
       }else{
          this.voteIcon=false;
       }
     },error=>{
       console.log(error)
     })
   }

  
   doInfinite1(infiniteScroll) {      
        this.count_list=this.count_list+10;      
        setTimeout(() => {
          if(this.global.network_status == 2){
              this.network_status=2;
              this.viewservice.getComments_limit(this.UserDetails,this.count_list)
               .subscribe(res=>{                
                 if(res==null || res==[]){
                   this.setCmts=[];
                 }else{
                   this.setCmts=res;
                   if(this.setCmts.length == this.count_list){
                     this.infinite_count=1;
                   }else{                     
                     this.infinite_count=2;
                   }
                   infiniteScroll.complete();  
                 }
               },error=>{
                 console.log(error)
               })
             }else{
              this.network_status=1;
              infiniteScroll.complete();
            } 
          }, 500);    
   }

   

   playAudio(){
     if(this.currentTrack.playing==false && this.audioState==false){
      var data=this.global.imageUrl+''+this.viewDetail.path.url;
      this.audioFile = this.media.create(data);
      this.currentTrack.playing=true;
      
      this.audioFile.play(); 
     }else{

       if(this.audioState==false){
         this.currentTrack.playing=false;
         
         this.audioState=true;
         this.audioFile.pause();
       }else{
         
         this.audioFile.getCurrentPosition().then((position) => {
          
          // get file duration    
          let duration = this.audioFile.getDuration();
          
          //get current position
          let calcTime= position*1000;
          this.audioFile.seekTo(calcTime);
          this.currentTrack.playing=true;
          this.audioState=false;
          this.audioFile.play();
          
         });
       }
     }       
   }
   
   reportPopUp(){
   if(localStorage.getItem("user_id")!=null){
   
             const actionSheet = this.actionSheetCtrl.create({
              title: 'Report',
              buttons: [
                {
                  text: 'Report This Content',
                  //role: 'destructive',
                  handler: () => {
                        const alert = this.alertCtrl.create();
            
             alert.setTitle('Report'+' '+this.viewDetail.file_type);

             this.Reports.forEach(l => {

                  alert.addInput({
                      type: 'radio',
                      label: l.report,
                      value: l.id
                  });

             });

             alert.addButton({
                  text: 'Cancel',
                  role: 'cancel',
             });

             alert.addButton({
                  text: 'OK',
                  handler: (id)=> {
                   if(id!=undefined || id!=null){
                    this.ReportId=id;
                    for(let i=0;i<this.Reports.length;i++){
                      if(this.Reports[i].id==id){
                        this.reportName=this.Reports[i].report;
                      }
                    }
                    
                    let data={
                             "user_id": this.userId,
                             "upload_id": this.UserDetails,
                             "description": this.reportName
                           }; 

                          
                    this.viewservice.Reportstatus(data)
                       .subscribe(res=>{   
                          if(res==true){
                           
                            this.toast.show(`This Content has been reported successfully`, '2000', 'bottom').subscribe(
                              toast => {
                            });
                          }else{
                            
                            this.toast.show(`This Content has been already reported`, '2000', 'bottom').subscribe(
                              toast => {
                            });
                          }            
                           
                    },error=>{
                         this.toast.show(`Please try again later`, '2000', 'bottom').subscribe(
                            toast => {
                              
                            }
                           );
                         console.log(error);
                    })
                   }  
                  }
             });

             alert.present();
                  }
                },{
                  text: 'Report This User',
                  handler: () => {
                    console.log('Archive clicked');
                    let reportData={
                      "user_id": localStorage.getItem("user_id"),
                      "block_user":this.viewDetail.user["id"]
                    };
                    this.viewservice.Reportuser(reportData).subscribe(res=>{
                       if(res==true){
                         this.toast.show(`User has been reported successfully`, '2000', 'bottom').subscribe(
                              toast => {
                            });
                       }else{
                         this.toast.show(`User has been already reported`, '2000', 'bottom').subscribe(
                              toast => {
                            });
                       }
                    },error=>{
                      this.toast.show(`Please try again later`, '2000', 'bottom').subscribe(
                            toast => {        
                      });
                      console.log(error);
                    })

                  }
                },{
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });

        actionSheet.present();
    }else{  
              let toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
     }     
  }

  read(){   
    this.readMore = this.readMore ? false : true;
    if(this.readMore==true){
      this.text='more';
    }else{
      this.text='less'; 
    }
  }

}