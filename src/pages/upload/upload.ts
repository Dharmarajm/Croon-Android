import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, AlertController, LoadingController, App, Nav} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ModalController, ToastController, ViewController } from 'ionic-angular';
import { VotesProvider } from '../../providers/myvotes/myvotes';
//import { IOSFilePicker } from '@ionic-native/file-picker';
import { Globals } from '../../providers/global';
import { UploadProvider } from '../../providers/upload/upload';
import { HomeProvider } from '../../providers/home/home'
import { NotificationProvider } from '../../providers/notification/notification';
import { OneSignal } from '@ionic-native/onesignal';
import { VideoEditor,CreateThumbnailOptions  } from '@ionic-native/video-editor';
import { MenuPage } from '../menu/menu';
import { StreamingMedia, StreamingVideoOptions , StreamingAudioOptions } from '@ionic-native/streaming-media';
//import { Storage } from '@ionic/storage';

//const MEDIA_FILES_KEY = 'mediaFiles';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  
  @ViewChild('input') myInput ;
  @ViewChild('myvideo') myVideo: any;
  @ViewChild('myaudio') private myaudio: any;
  uploaddeatils:any[]=[];
  user_id:any;
  user:any;
  public queryupload : string;
  
  isAvailable: boolean = false;
  confirm:any;
  mediaFiles = [];
  uploadURI:any;
  fileName?:any;
  languages:any;
  genres:any;
  split_mimeType:any;
  data:any;
  loader: any;
  LanguageName?:any;
  LanguageId:any;
  GenreId:any;
  description:any;
  datacheck:any;
  file_type:any;
  someValue:any;
  storeID:any;
  notify_count?:any; 
  progress?: number = 0;
  count_list:any;
  assignPush:any;
  getPushData:any;
  counter:number = 0;
  thumbnail:any;
  progressbar:boolean = false;
  genreName:any;
  network_status:any;
  videotag:boolean = false;
  audiotag:boolean = false;
  inScreenLoader:boolean = false;
  ud_id:any;
  //audioFile:MediaObject;
  //video:any;
  filePathtest:any;
  playPath:any;
  uploadCount:any=0;
  showLoadMore:boolean=false;

  constructor(public app:App,public nav: Nav,public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public alertCtrl:AlertController, private socialSharing: SocialSharing, private mediaCapture: MediaCapture, private media: Media,private fileChooser: FileChooser, public modalCtrl : ModalController, public upload: VotesProvider,public global:Globals,public toastCtrl: ToastController,public loadingCtrl: LoadingController,private file: File,private filePath: FilePath,private transfer: FileTransfer,private toast: Toast,public uploadService:UploadProvider,public homeService:HomeProvider, private notify: NotificationProvider,private oneSignal:OneSignal,private videoEditor: VideoEditor,public _zone: NgZone, public menu: MenuPage, private streamingMedia: StreamingMedia){  
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
           this.uploadget();
         }  
        }, 0);
        this.triggerNotification();
      })
    this.count_list=10;    
    if( localStorage.getItem("user_id")!= null) {
      this.user_id = localStorage.getItem("user_id");
    }else{
      this.user_id = null;
    }

    if(localStorage.getItem("storeID")!=null){
      this.storeID=localStorage.getItem("storeID"); 
    }else{
      this.storeID=null;
    }

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');   
    this.user_id = localStorage.getItem("user_id");
    //this.video = this.myVideo.nativeElement;
  }


  ionViewWillEnter(){
    //console.log(this.uploaddeatils.length)
    this.uploadlength();
    if(localStorage.getItem("uploadcount")!=undefined){
       this.uploadCount=localStorage.getItem("uploadcount");
    }
    
    if(localStorage.getItem("uploadpage") =="myupload"){
        this.queryupload = 'myupload'; 
        if(this.uploaddeatils.length==0){
         this.uploadget();  
        }
    }else if(localStorage.getItem("uploadpage") == null){
        this.queryupload = 'new';
        //this.getlanguages();
        this.getGenre();
        if(this.uploaddeatils.length==0){
         this.uploadget();  
        }  
    }else{
        this.queryupload = 'new';
        //this.getlanguages();
        if(this.uploaddeatils.length==0){
         this.uploadget();  
        }
        this.getGenre();  
    }
    this.global.toggled = false;
    this.global.current_page="UploadPage";
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
  

  uploadlength(){

    if(this.user_id!=null){
      this.user=this.user_id;
      
     }else if(this.storeID!=null){
      this.user=this.storeID;
     }
     
     this.upload.uploaddisp(this.user)//
       .subscribe(res=>{ 
         this.uploadCount=res.length;
         localStorage.setItem("uploadcount",this.uploadCount); 
       },error=>{
         
         console.log(error)
       })
  }

  presentToast() {
    this.toast.show(`Press again to exit`, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
  }

   goto_login(){
      this.navCtrl.push('LoginPage');
      let elements = document.querySelectorAll(".tabbar");

      if (elements != null) {
          Object.keys(elements).map((key) => {
              elements[key].style.display = 'none';
          });
      }
    }

  
  notification(){
    this.navCtrl.push('NotificationPage');
  }

  public openModal(user,current_status,rank){
   if(this.global.network_status==2){
    this.network_status=2; 
    localStorage.setItem("ViewDetails",user);
    localStorage.setItem("which_page","Uploadpage")
    localStorage.setItem("current_status_id",current_status.competition_transaction_id);
    localStorage.setItem("rank",rank);
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
               this.uploadget();
             }  
            }, 0);
            this.triggerNotification();
          })

      this.upload.uploaddisp(this.user)//,this.count_list
     .subscribe(res=>{
       this.uploaddeatils=res;
     },error=>{
       console.log(error)
     })
    }) 
    modalPage.present();
   }else{
     this.network_status=1;
     this.uploaddeatils=[];
   } 
  }

  new_to_myupload(e){
    if (e.direction == 2) {
      this.uploaddeatils=[];
      //this.count_list=10;
      this.queryupload = 'myupload';
      if(this.uploaddeatils.length==0){
         this.uploadget();  
       }    
    }
  }
  myupload_to_new(e){
    if (e.direction == 4) {
      this.queryupload = 'new';
      this.global.toggled = false;
      this.someValue="";
      //this.getlanguages();
      if(this.genres.length==0){
        this.getGenre();  
      }
           
    }
  }

  compilemsg(index):string{
      //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      var msg = "Hi iam  Crooner";
      return msg.concat(" \n Sent from Croon App !");
  }

  regularShare(id){
    //var msg = this.compilemsg(index);
    this.socialSharing.share(this.global.shareUrl+'genres/croon_share?id='+id);
  }


  
  Audio(){
  if(this.user_id == null){ 

    let toast = this.toastCtrl.create({
        message: 'Login to your Croon account',
        duration: 2000,
        position: 'bottom'
      });
    toast.present();

     
  }else{
      this.fileName="";
      this.uploadURI="";
      this.thumbnail="";
      this.videotag=false;
      this.audiotag=false;
      let options: CaptureAudioOptions = { limit: 1,duration: 180};
      this.mediaCapture.captureAudio(options)
      .then((res: MediaFile[]) => {
      let capturedFile = res[0];
      let fileName = capturedFile.name;
      this.fileName = capturedFile.name
      //let type = capturedFile.type.split('/');
      this.file_type ='audio';
      let dir = capturedFile['localURL'].split('/');
      dir.pop(); 
      let fromDirectory = dir.join('/');      
      var toDirectory = this.file.dataDirectory;
      let save_file = fromDirectory+'/'+this.fileName;
      this.uploadURI = save_file;
      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.playPath=toDirectory+ this.fileName;

        this.thumbnail="assets/imgs/music1.jpg";
        
        this.inScreenLoader=true;
        setTimeout(()=>{
          this.inScreenLoader=false;
        },5000);
        //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
      },err => {
        console.log('err: ', err);
      });
     },(err) => {
          console.error(err)
          let alertcheck=err.split("{");
          let intent = alertcheck[0];
          if(intent=='No Activity found to handle Intent '){
           var data = { message : 'hello world' };
           var modal = this.modalCtrl.create('AudioModalPage',data);
           modal.present().then(() => {
           });
           modal.onDidDismiss(() => {
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
              }  
             }, 0);
            this.triggerNotification();
            })

             this.customRecord();
           })
         }
      });
    }
  }
  

  customRecord(){
    if(localStorage.getItem("audiolist")!=undefined){
      this.uploadURI = localStorage.getItem("audiolist");
      let data = localStorage.getItem("fileNameaudio");
      this.fileName = data.replace(/^"(.*)"$/, '$1');
      
      this.playPath= this.file.externalDataDirectory+this.fileName;
      let uri=this.playPath;
      //this.filePath.resolveNativePath(uri).then((filePath) => {
        //console.log(filePath)

        this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: FileEntry) => {
         return new Promise((resolve, reject) => {
          fileEntry.file(meta => resolve(meta), error => reject(error));
         });
        }).then((fileMeta: IFile) => {
          let type = fileMeta.type.split('/');
          let dir = fileMeta['localURL']
          this.uploadURI=dir;
          //this.playPath=this.uploadURI;
         
       }).catch(err=>console.log(err)); 
      //}).catch(err=>console.log(err)); 
      localStorage.removeItem("audiolist");
      localStorage.removeItem("fileNameaudio")
      this.thumbnail="assets/imgs/music1.jpg";
      this.file_type ='audio';
      this.inScreenLoader=true;
      setTimeout(()=>{
        this.inScreenLoader=false;
      },5000);
    }
  }

  Video(){
   if(this.user_id == null){ 
    let toast = this.toastCtrl.create({
        message: 'Login to your Croon account',
        duration: 2000,
        position: 'bottom'
      });
    toast.present();
     
  }else{
    this.fileName="";
    this.uploadURI="";
    this.thumbnail="";
    this.videotag=false;
    this.audiotag=false;
    
    let filedir = this.file.dataDirectory + 'files/'
      let record_file = 'Movies'
      this.file.writeExistingFile(filedir, record_file, 'folder').then(res =>{
     }).catch(err => { console.log(err.message) });

    let options: CaptureVideoOptions = { limit: 1,duration: 60};
    this.mediaCapture.captureVideo(options)
    .then((res: MediaFile[]) => {
      let capturedFile = res[0];
      let fileName = capturedFile.name;
      this.fileName = capturedFile.name
      let type = capturedFile.type.split('/');
      this.file_type = type[0];
      let dir = capturedFile['localURL'].split('/');
      dir.pop(); 
      let fromDirectory = dir.join('/'); 
      var toDirectory = this.file.dataDirectory;
      let save_file = fromDirectory+'/'+this.fileName;
      this.uploadURI = save_file;
       

      /*let typetest=capturedFile.fullPath;
      this.filePathtest=(typetest).toString();
                   let options = {
                                fileUri             : this.filePathtest,
                                outputFileName      : new Date().getTime().toString() + '.mp4',
                                outputFileType      : this.videoEditor.OutputFileType.MPEG4,
                                saveToLibrary       : true,
                                maintainAspectRatio : true,
                                width               : 480,
                                height              : 360,
                                videoBitrate        : 500000,
                                audioChannels       : 1,
                                audioSampleRate     : 22050,
                                audioBitrate        : 96000,
                                progress            : (info: number) => {
                                  console.log('Progreso: ' + info * 100 + '%');
                                }
                              };

                            this.videoEditor.transcodeVideo(options).then((pathTranscodedVideo: string) => {
                              console.log(pathTranscodedVideo);
                            }).catch(e => console.log(e));*/
     


      
      this.file.copyFile(fromDirectory, fileName, toDirectory,fileName).then(()=>{ 
       var option:CreateThumbnailOptions = {fileUri:toDirectory+ this.fileName,width:160, height:206, atTime:1, outputFileName: this.fileName, quality:50 };
       this.playPath=toDirectory+ this.fileName;
       this.videoEditor.createThumbnail(option).then(result=>{
          //result-path of thumbnail
          this.thumbnail=result;
          this.inScreenLoader=true;
          setTimeout(()=>{
            this.inScreenLoader=false;
          },5000);
       }).catch(e=>{
        console.log(e)

       // alert('fail video editor');
       });

       //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);

     },err => {
        console.log('err: ', err);
      });
      /*this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
        
      },err => {
        console.log('err: ', err);
      });*/
     },
     (err: CaptureError) => console.error(err));  
    }
  }

  play() {
    if (this.file_type == 'audio'){
      // console.log('play')
      // console.log(this.uploadURI)
      // this.audiotag=true;
      // //this.audioFile = this.media.create(this.uploadURI);
      // console.log(this.myaudio)
      // if(this.myaudio==undefined){
      //   let audio = this.myaudio._element.nativeElement
      //   //this.play();
      // }else{
      //   let audio = this.myaudio._element.nativeElement
      //   console.log(audio)
      //   setTimeout(()=>{
      //   console.log(audio)
      //   audio.src = this.uploadURI;
      //   audio.play();
      //   console.log(audio)
      //   },500);
      // }
      var options: StreamingAudioOptions = {
        bgColor: "#FFFFFF",
        bgImage: 'http://cdn1.theodysseyonline.com/files/2016/01/04/6358748036944186621892622963_music.jpg',
        bgImageScale: "fit", // other valid values: "stretch", "aspectStretch"
        initFullscreen: true, // true is default. iOS only.
        keepAwake: true, // prevents device from sleeping. true is default. Android only.
        successCallback: function() {
          console.log("Player closed without error.");
        },
        errorCallback: function(errMsg) {
          console.log("Error! " + errMsg);
        }
      };

      /* let options: StreamingAudioOptions = {
        successCallback: () => { console.log('Finished Audio') },
        errorCallback: (e) => { console.log('Error: ', e) },
        initFullscreen: false // iOS only!
       };*/

      let data = this.playPath;
      this.streamingMedia.playAudio(data, options);
            
      }else if(this.file_type == 'video'){
      // console.log('test')
      // this.videotag=true;
      // let path = this.file.dataDirectory + this.fileName;
      // console.log(path)
      // let url = path.replace(/^file:\/\//, '');
      // console.log(url)
      // if(this.myVideo==undefined){
      //   let video = this.myVideo.nativeElement;
      //   //this.play();
      // }else{
      //   let video = this.myVideo.nativeElement;
      //   setTimeout(()=>{
      //    video.src = url;
      //    video.play();
      //   },3000);
      // }  
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'portrait', //landscape
        shouldAutoClose: false,
        controls: true
      };
      let data=this.playPath;
      this.streamingMedia.playVideo(data, options);

      }
    }
 

  stop(){
      let data = this.playPath;
      this.streamingMedia.stopAudio();
  }
  
  pause(){
    this.streamingMedia.pauseAudio();
  }

  resume(){
    this.streamingMedia.resumeAudio();
  }
  
  /*storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }*/


  cancelSearch(event){
   this.someValue="";
   this.global.toggled = false;
   this.queryupload = 'myupload';
   //this.uploadget();
  }


  public toggle(): void {
     this.global.toggled = this.global.toggled ? false : true;
     this.queryupload = 'myupload';
     setTimeout(() => {
       this.myInput.setFocus();
     },150);
  }

  segmentClick(event){
    
   if(localStorage.getItem("user_id")!=null){
     this.queryupload=event;
     if(event=='myupload'){
       //this.uploaddeatils=[];
       
       if(this.uploaddeatils.length==0){
         this.uploadget();  
        }
     }else{
       
       //this.getlanguages();
       if(this.genres.length==0){
        this.getGenre();  
        }
     } 
   }else{
     if(event=='myupload'){
    
       //this.uploaddeatils=[];
       if(this.uploaddeatils.length==0){
         this.uploadget();  
        }     
     }
   }
  }


  Upload(){
  if(this.user_id == null){ 
    let toast = this.toastCtrl.create({
        message: 'Login to your Croon account',
        duration: 2000,
        position: 'bottom'
      });
    toast.present();     
  }else{
    
    //Android
    this.fileName="";
    this.uploadURI="";
    this.thumbnail="";
    this.videotag=false;
    this.audiotag=false;
    if(this.platform.is('android')){ 
     this.fileChooser.open()
     .then(uri =>{

      let filedir = this.file.dataDirectory + 'files/'
      let record_file = 'Movies'
      this.file.writeExistingFile(filedir, record_file, 'folder').then(res =>{
     }).catch(err => { console.log(err.message) });


      //this.uploadURI = uri;
        this.filePath.resolveNativePath(uri).then((filePath) => {
         /*this.filePathtest=(filePath).toString();
         console.log(this.filePathtest)*/
          this.file.resolveLocalFilesystemUrl(filePath).then((fileEntry: FileEntry) => {
            return new Promise((resolve, reject) => {
              fileEntry.file(meta => resolve(meta), error => reject(error));
            });
          }).then((fileMeta: IFile) => {
              //this.split_mimeType=fileMeta.type.split('/').toString()
              let type = fileMeta.type.split('/');
              this.file_type = type[0];
              if(this.file_type=='video' || this.file_type=='audio'){
                 // if(fileMeta.size<104857600){ 
                   this.uploadURI = uri;
                   console.log(this.uploadURI)
                   this.fileName=fileMeta.name;
                       /*let options = {
                                    fileUri             : this.filePathtest,
                                    outputFileName      : new Date().getTime().toString() + '.mp4',
                                    outputFileType      : this.videoEditor.OutputFileType.MPEG4,
                                    saveToLibrary       : true,
                                    maintainAspectRatio : true,
                                    width               : 480,
                                    height              : 360,
                                    videoBitrate        : 500000,
                                    audioChannels       : 1,
                                    audioSampleRate     : 22050,
                                    audioBitrate        : 96000,
                                    progress            : (info: number) => {
                                      console.log('Progreso: ' + info * 100 + '%');
                                    }
                                  };

                                this.videoEditor.transcodeVideo(options).then((pathTranscodedVideo: string) => {
                                  console.log(pathTranscodedVideo);
                                }).catch(e => console.log(e));*/
                   
                   if(this.file_type=='video'){
                     let fileName = fileMeta.name;
                     let dir = fileMeta['localURL'].split('/');
                     dir.pop(); 
                     let fromDirectory = dir.join('/');
                     var toDirectory = this.file.dataDirectory;
                      
                     this.file.copyFile(fromDirectory, fileName, toDirectory,fileName).then(()=>{
                       var option:CreateThumbnailOptions = {fileUri:toDirectory+ this.fileName,width:160, height:206, atTime:1, outputFileName: this.fileName, quality:50 };
                       this.playPath=this.uploadURI;
                       this.videoEditor.createThumbnail(option).then(result=>{
                          //result-path of thumbnail
                          this.thumbnail=result;
                          this.inScreenLoader=true;
                          setTimeout(()=>{
                            this.inScreenLoader=false;
                          },5000);
                       }).catch(e=>{
                         this.fileName="";
                         this.uploadURI="";
                         this.showToast('bottom','Selected file is not supported!');
                       // alert('fail video editor');
                       });
                     },err => {
                        console.log('err: ', err);
                     });
                   }else{
                     this.thumbnail="assets/imgs/music1.jpg";
                     this.inScreenLoader=true;
                      setTimeout(()=>{
                        this.inScreenLoader=false;
                      },5000);
                     this.playPath=this.uploadURI;
                   }
                 // }else{
                 //   this.showToast('bottom','Selected file is too large(Maximum file size is 100MB)!'); 
                 // }  
              }else{
               this.showToast('bottom','Selected file is not supported!');  
              }
          });
        }); 
     })
     .catch(e => console.log(e));
    }
    
    //iOS
    
    if(this.platform.is('ios')){
     /*this.filePicker.pickFile()
     .then(uri => {
       this.uploadURI = uri[0]['path'];      
       this.file.resolveLocalFilesystemUrl(this.uploadURI).then((fileEntry: FileEntry) => {
          return new Promise((resolve, reject) => {
            fileEntry.file(meta => resolve(meta), error => reject(error));
          });
       }).then((fileMeta: IFile) => {
       //this.split_mimeType=fileMeta.type.split('/').toString()
        let type = fileMeta.type.split('/');
        this.file_type = type[0];

        if(this.file_type=='video' || this.file_type=='audio'){
         this.uploadURI = fileMeta['localURL'];
         this.fileName=fileMeta.name;
         if(this.file_type=='video'){
           let fileName = fileMeta.name;
           let dir = fileMeta['localURL'].split('/');
           console.log(dir)
           dir.pop(); 
           let fromDirectory = dir.join('/');
           var toDirectory = this.file.dataDirectory;
            
           this.file.copyFile(fromDirectory, fileName, toDirectory,fileName).then(()=>{ 
             var option:CreateThumbnailOptions = {fileUri:toDirectory+ this.fileName,width:160, height:206, atTime:1, outputFileName: this.fileName, quality:50 };
              console.log(option)
             this.playPath=this.file.dataDirectory+this.fileName;
             this.videoEditor.createThumbnail(option).then(result=>{
                //result-path of thumbnail
                this.thumbnail=result;
                this.inScreenLoader=true;
                setTimeout(()=>{
                  this.inScreenLoader=false;
                },5000);
             }).catch(e=>{
              console.log(e)
              this.fileName="";
              this.uploadURI="";
              this.showToast('bottom','Selected file is not supported!');
             // alert('fail video editor');
             });
           },err => {
              console.log('err: ', err);
           });
         }else{
           this.thumbnail="assets/imgs/music1.jpg";
           this.inScreenLoader=true;
            setTimeout(()=>{
              this.inScreenLoader=false;
            },5000);
           console.log(uri[0]['title'])
           if(uri[0]['title']==undefined || uri[0]['title']==null){
             this.playPath=uri[0]['path'];
             console.log(this.playPath)
           }else{
             this.playPath=uri[0]['path'];
             console.log(this.playPath)
           }  
         }
        }else{
         this.showToast('bottom','Selected file is not supported!');  
        }

       });
      })
     .catch(err => console.log('Error', err));*/
    }
   }
  }


  uploadget(){
   if(this.global.network_status==2){
     this.uploaddeatils=[];
     this.network_status=2;
     this.inScreenLoader = true;
     
     if(this.user_id!=null){
      this.user=this.user_id;
      
     }else if(this.storeID!=null){
      this.user=this.storeID;
     }

      this.upload.uploaddisp(this.user)//,this.count_list
       .subscribe(res=>{
         this.inScreenLoader = false;
         this.uploaddeatils=res; 
         if(this.uploaddeatils.length == this.count_list){
           this.showLoadMore=true;
         }else{
           this.showLoadMore=false;
         } 
         //this.uploadCount=this.uploaddeatils.length;
         //localStorage.setItem("uploadcount",this.uploadCount); 
         this.menu.upload_count();
       },error=>{
         this.inScreenLoader = false;
         this.uploaddeatils=[];
         console.log(error)
       })
   }else{
     this.network_status=1;
     this.uploaddeatils=[];
   }     
  }

  /*getlanguages(){
     this.uploadService.getLanguages()
            .subscribe(
            res => {
                this.languages=res;
            },
            error => {
                console.log(error);
      });
  }*/

  /*languagePopUp(lang){
    const alert = this.alertCtrl.create();
    
    alert.setTitle('Select Languages');

    this.languages.forEach(l => {
          alert.addInput({
              type: 'radio',
              label: l.language_name,
              value: l.id,
              checked: lang === l.language_name
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
            this.LanguageId=id;
            for(let i=0;i<this.languages.length;i++){
              if(this.languages[i].id==id){
                this.LanguageName=this.languages[i].language_name;
              }
            }
           } 
          }
    });

    alert.present();      
  } */


  getGenre(){
    this.homeService.home_type()
            .subscribe(
            res => {
                this.genres=res;
            },
            error => {
                console.log(error);
            }); 
  }

 genrePopUp(genre){
    const alert = this.alertCtrl.create();
    
    alert.setTitle('Select Genres');

    this.genres.forEach(l => {

          alert.addInput({
              type: 'radio',
              label: l.genre_type,
              value: l.id,
              checked: genre === l.genre_type
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
              this.GenreId=id;
              for(let i=0;i<this.genres.length;i++){
               if(this.genres[i].id==id){
                this.genreName=this.genres[i].genre_type;
               }
              }
            } 
          }
    });

    alert.present();      
  }

  uploadVideo() {
     this.progress=0;
     this.progressbar=true; 
     const fileTransfer: FileTransferObject = this.transfer.create();  
     this.data={
        "title":this.fileName,
        "path":this.uploadURI,
        "user_id":this.user_id,
        "language_id":1,
        "genre_id":this.GenreId,
        "file_type": this.file_type,
        "description": this.description
     }

    let options1: FileUploadOptions = {
     fileKey: 'video_upload_file',
     fileName: this.uploadURI,
     mimeType: 'multipart/form-data',
     params: this.data,
     chunkedMode: false,
     headers:{ Connection: "close" }
    }

 

    
    /*this.presentLoading();*/

    fileTransfer.upload(this.uploadURI, this.global.baseUrl+'/users/new_upload', options1)
    .then((res) => {
      /*this.loader.dismissAll();*/
      this.progressbar=false;
      this.datacheck=res.response;
      if(this.datacheck=="true"){
       this.fileName="";
       this.uploadURI="";
       this.LanguageId="";
       this.thumbnail="";
       this.GenreId="";
       this.description="";
       this.LanguageName="Languages";
       this.genreName="Genres";
       this.mediaFiles=[];
       this.videotag=false;
       this.audiotag=false;
       this.playPath="";

       localStorage.removeItem('videoNum') 
       this.showToast('bottom', this.file_type+' '+'is uploaded successfully!');
       this.uploadlength()
       this.uploadget();  
       this.menu.upload_count();
      }else{
        this.showToast('bottom', this.file_type+' '+'uploaded is failed!');
      }
      //this.flag_upload = true;
      
    }, (err) => {
    // error
    console.log(err)
    this.progressbar=false;
    //this.loader.dismissAll();
    this.showToast('bottom', this.file_type+' '+'uploaded is failed!');
    }); 

    fileTransfer.onProgress((progressEvent) => {
     
      this._zone.run(() => {
        if (progressEvent.lengthComputable) {
          var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
          this.progress=perc;
        }
      })
    });
  }
  
 
  presentLoading() {
    this.loader = this.loadingCtrl.create({
    content: 'Uploading…'
    });
    this.loader.present();
  }
  
  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: position
    });
    toast.present(toast);
   }


   /*doInfinite(infiniteScroll) {
        
        console.log('testdo') 
        setTimeout(() => {
          if(this.global.network_status==2){
            this.network_status=2;
            this.count_list=this.count_list+10;
            this.upload.uploaddisp_limit(this.user,this.count_list)//,this.count_list
            .subscribe(res=>{
             this.uploaddeatils=res;
             infiniteScroll.complete(); 
             if(this.uploaddeatils.length == this.count_list){
               this.showLoadMore=true;
             }else{
               this.showLoadMore=false;
             }
            },error=>{
             console.log(error)
            })
           console.log('cd')
          }else{
            infiniteScroll.complete();
          }
          }, 500);
    }

    onInput(event){
      
      if(this.global.network_status==2){
       this.uploaddeatils=[]; 
       this.network_status=2;
       this.inScreenLoader = true;
     
       if(this.user_id!=null){
        this.user=this.user_id;
      
       }else if(this.storeID!=null){
        this.user=this.storeID;
       }
       if(this.someValue.length!=0){
         this.upload.uploadSearch(this.user,this.someValue)//,this.count_list
         .subscribe(res=>{
           this.inScreenLoader = false;
           this.uploaddeatils=res;
           this.menu.upload_count();
         },error=>{
           this.inScreenLoader = false;
           this.uploaddeatils=[];
           console.log(error)
         })
       }else{
         this.upload.uploaddisp_limit(this.user,this.count_list)//
         .subscribe(res=>{
         this.inScreenLoader = false;
         this.uploaddeatils=res; 
         if(this.uploaddeatils.length == this.count_list){
           this.showLoadMore=true;
         }else{
           this.showLoadMore=false;
         } 
         //this.uploadCount=this.uploaddeatils.length;
         //localStorage.setItem("uploadcount",this.uploadCount); 
         //this.menu.upload_count();
         },error=>{
           this.inScreenLoader = false;
           this.uploaddeatils=[];
           console.log(error)
         })
       }  
      }else{
       this.network_status=1;
       this.uploaddeatils=[];
      }     
    }*/
 delete(id){
   console.log(id)
 }
}
