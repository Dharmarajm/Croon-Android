var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, App, Nav } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Toast } from '@ionic-native/toast';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ModalController, ToastController } from 'ionic-angular';
import { VotesProvider } from '../../providers/myvotes/myvotes';
//import { IOSFilePicker } from '@ionic-native/file-picker';
import { Globals } from '../../providers/global';
import { UploadProvider } from '../../providers/upload/upload';
import { HomeProvider } from '../../providers/home/home';
import { NotificationProvider } from '../../providers/notification/notification';
import { OneSignal } from '@ionic-native/onesignal';
import { VideoEditor } from '@ionic-native/video-editor';
import { MenuPage } from '../menu/menu';
import { StreamingMedia } from '@ionic-native/streaming-media';
//import { Storage } from '@ionic/storage';
//const MEDIA_FILES_KEY = 'mediaFiles';
var UploadPage = /** @class */ (function () {
    function UploadPage(app, nav, navCtrl, navParams, platform, alertCtrl, socialSharing, mediaCapture, media, fileChooser, modalCtrl, upload, global, toastCtrl, loadingCtrl, file, filePath, transfer, toast, uploadService, homeService, notify, oneSignal, videoEditor, _zone, menu, streamingMedia) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.mediaCapture = mediaCapture;
        this.media = media;
        this.fileChooser = fileChooser;
        this.modalCtrl = modalCtrl;
        this.upload = upload;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.file = file;
        this.filePath = filePath;
        this.transfer = transfer;
        this.toast = toast;
        this.uploadService = uploadService;
        this.homeService = homeService;
        this.notify = notify;
        this.oneSignal = oneSignal;
        this.videoEditor = videoEditor;
        this._zone = _zone;
        this.menu = menu;
        this.streamingMedia = streamingMedia;
        this.uploaddeatils = [];
        this.isAvailable = false;
        this.mediaFiles = [];
        this.progress = 0;
        this.counter = 0;
        this.progressbar = false;
        this.videotag = false;
        this.audiotag = false;
        this.inScreenLoader = false;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.someValue = "";
                if (_this.global.toggled == false) {
                    if (_this.counter == 0) {
                        _this.counter++;
                        _this.presentToast();
                        setTimeout(function () { _this.counter = 0; }, 3000);
                    }
                    else {
                        platform.exitApp();
                    }
                }
                else {
                    _this.global.toggled = false;
                }
            }, 0);
            _this.triggerNotification();
        });
        //this.count_list=10;    
        if (localStorage.getItem("user_id") != null) {
            this.user_id = localStorage.getItem("user_id");
        }
        else {
            this.user_id = null;
        }
        if (localStorage.getItem("storeID") != null) {
            this.storeID = localStorage.getItem("storeID");
        }
        else {
            this.storeID = null;
        }
    }
    UploadPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UploadPage');
        this.user_id = localStorage.getItem("user_id");
        //this.video = this.myVideo.nativeElement;
    };
    UploadPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (localStorage.getItem("uploadpage") == "myupload") {
            this.queryupload = 'myupload';
            this.uploadget();
        }
        else if (localStorage.getItem("uploadpage") == null) {
            this.queryupload = 'new';
            this.getlanguages();
            this.getGenre();
        }
        else {
            this.queryupload = 'new';
            this.getlanguages();
            this.uploadget();
            this.getGenre();
        }
        this.global.toggled = false;
        this.global.current_page = "UploadPage";
        this.ud_id = localStorage.getItem("storeID");
        if (this.ud_id != null) {
            this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                _this.notify_count = res._body;
            }, function (error) {
                console.log(error);
            });
        }
    };
    UploadPage.prototype.triggerNotification = function () {
        var _this = this;
        this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.getIds().then(function (id) {
            console.log(id.userId);
            localStorage.setItem("player_id", id.userId);
        });
        //this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            // handle received here how you wish.
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (result) {
            _this.assignPush = JSON.stringify(result.notification.isAppInFocus);
            _this.getPushData = result.notification.payload.additionalData;
            localStorage.setItem("action", _this.assignPush);
            if (localStorage.getItem("action") == 'false') {
            }
            else {
                console.log('focus', result);
                localStorage.setItem("noti_page", _this.getPushData.action);
                if (_this.getPushData.value != undefined || _this.getPushData.value != null) {
                    localStorage.setItem("ViewDetails", _this.getPushData.value.id);
                    localStorage.setItem("noti_genre_id", _this.getPushData.value.genre.id);
                    localStorage.setItem("noti_genre_type", _this.getPushData.value.genre.genre_type);
                    if (localStorage.getItem("noti_page") == "home") {
                        //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0})
                        //this.nav.getActiveChildNav().select(0);
                        _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                    }
                    else {
                        //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                        //this.nav.getActiveChildNav().select(3);
                        _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                    }
                }
                else if (localStorage.getItem("noti_page") == "home") {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0}) 
                    //this.nav.getActiveChildNav().select(0);
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
                    //this.nav.getActiveChildNav().select(3);
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    UploadPage.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '3000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    UploadPage.prototype.goto_login = function () {
        this.navCtrl.push('LoginPage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    UploadPage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    UploadPage.prototype.openModal = function (user, current_status) {
        var _this = this;
        console.log(user);
        console.log(current_status);
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("which_page", "Uploadpage");
            localStorage.setItem("current_status_id", current_status.competition_transaction_id);
            var data = { message: 'hello world' };
            var modalPage = this.modalCtrl.create('ModalPage', data);
            modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        _this.someValue = "";
                        if (_this.global.toggled == false) {
                            if (_this.counter == 0) {
                                _this.counter++;
                                _this.presentToast();
                                setTimeout(function () { _this.counter = 0; }, 3000);
                            }
                            else {
                                _this.platform.exitApp();
                            }
                        }
                        else {
                            _this.global.toggled = false;
                        }
                    }, 0);
                    _this.triggerNotification();
                });
                _this.upload.uploaddisp(_this.user) //,this.count_list
                    .subscribe(function (res) {
                    _this.uploaddeatils = res;
                }, function (error) {
                    console.log(error);
                });
            });
            modalPage.present();
        }
        else {
            this.network_status = 1;
            this.uploaddeatils = [];
        }
    };
    UploadPage.prototype.new_to_myupload = function (e) {
        if (e.direction == 2) {
            this.uploaddeatils = [];
            //this.count_list=10;
            this.queryupload = 'myupload';
            this.uploadget();
        }
    };
    UploadPage.prototype.myupload_to_new = function (e) {
        if (e.direction == 4) {
            this.queryupload = 'new';
            this.getlanguages();
            this.getGenre();
        }
    };
    UploadPage.prototype.compilemsg = function (index) {
        //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
        var msg = "Hi iam  Crooner";
        return msg.concat(" \n Sent from Croon App !");
    };
    UploadPage.prototype.regularShare = function (id) {
        //var msg = this.compilemsg(index);
        this.socialSharing.share(this.global.shareUrl + 'genres/croon_share?id=' + id);
    };
    UploadPage.prototype.Audio = function () {
        var _this = this;
        if (this.user_id == null) {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            this.fileName = "";
            this.uploadURI = "";
            this.thumbnail = "";
            this.videotag = false;
            this.audiotag = false;
            var options = { limit: 1, duration: 360 };
            this.mediaCapture.captureAudio(options)
                .then(function (res) {
                var capturedFile = res[0];
                var fileName = capturedFile.name;
                _this.fileName = capturedFile.name;
                //let type = capturedFile.type.split('/');
                _this.file_type = 'audio';
                var dir = capturedFile['localURL'].split('/');
                dir.pop();
                var fromDirectory = dir.join('/');
                var toDirectory = _this.file.dataDirectory;
                var save_file = fromDirectory + '/' + _this.fileName;
                _this.uploadURI = save_file;
                _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function (res) {
                    _this.playPath = toDirectory + _this.fileName;
                    _this.thumbnail = "assets/imgs/music1.jpg";
                    //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
                }, function (err) {
                    console.log('err: ', err);
                });
            }, function (err) { return console.error(err); });
        }
    };
    UploadPage.prototype.Video = function () {
        var _this = this;
        if (this.user_id == null) {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            this.fileName = "";
            this.uploadURI = "";
            this.thumbnail = "";
            this.videotag = false;
            this.audiotag = false;
            var filedir = this.file.dataDirectory + 'files/';
            console.log(filedir);
            var record_file = 'Movies';
            this.file.writeExistingFile(filedir, record_file, 'folder').then(function (res) {
                console.log(res);
            }).catch(function (err) { console.log(err.message); });
            var options = { limit: 1, duration: 360 };
            this.mediaCapture.captureVideo(options)
                .then(function (res) {
                console.log(JSON.stringify(res));
                var capturedFile = res[0];
                var fileName = capturedFile.name;
                _this.fileName = capturedFile.name;
                var type = capturedFile.type.split('/');
                _this.file_type = type[0];
                var dir = capturedFile['localURL'].split('/');
                console.log(dir);
                dir.pop();
                var fromDirectory = dir.join('/');
                console.log(fromDirectory);
                var toDirectory = _this.file.dataDirectory;
                console.log(toDirectory);
                var save_file = fromDirectory + '/' + _this.fileName;
                _this.uploadURI = save_file;
                console.log(_this.uploadURI);
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
                _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function () {
                    var option = { fileUri: toDirectory + _this.fileName, width: 160, height: 206, atTime: 1, outputFileName: _this.fileName, quality: 50 };
                    console.log(option);
                    _this.playPath = toDirectory + _this.fileName;
                    _this.videoEditor.createThumbnail(option).then(function (result) {
                        //result-path of thumbnail
                        _this.thumbnail = result;
                    }).catch(function (e) {
                        console.log(e);
                        // alert('fail video editor');
                    });
                    //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
                }, function (err) {
                    console.log('err: ', err);
                });
                /*this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
                  this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
                  
                },err => {
                  console.log('err: ', err);
                });*/
            }, function (err) { return console.error(err); });
        }
    };
    UploadPage.prototype.play = function () {
        console.log(this.playPath);
        if (this.file_type == 'audio') {
            console.log(this.playPath);
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
            var options = {
                bgColor: "#FFFFFF",
                bgImage: 'http://18.209.25.86/uploads/image/image_path/play_music.jpg',
                bgImageScale: "fit",
                initFullscreen: true,
                keepAwake: true,
                successCallback: function () {
                    console.log("Player closed without error.");
                },
                errorCallback: function (errMsg) {
                    console.log("Error! " + errMsg);
                }
            };
            /* let options: StreamingAudioOptions = {
              successCallback: () => { console.log('Finished Audio') },
              errorCallback: (e) => { console.log('Error: ', e) },
              initFullscreen: false // iOS only!
             };*/
            var data = this.playPath;
            console.log(data);
            this.streamingMedia.playAudio(data, options);
            console.log(this.streamingMedia);
        }
        else if (this.file_type == 'video') {
            console.log(this.playPath);
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
            var options_1 = {
                successCallback: function () { console.log('Video played'); },
                errorCallback: function (e) { console.log('Error streaming'); },
                orientation: 'portrait',
                shouldAutoClose: false,
                controls: true
            };
            var data = this.playPath;
            console.log(data);
            this.streamingMedia.playVideo(data, options_1);
            console.log(this.streamingMedia);
        }
    };
    UploadPage.prototype.stop = function () {
        console.log(this.streamingMedia);
        var data = this.playPath;
        this.streamingMedia.stopAudio();
        console.log(this.streamingMedia);
    };
    UploadPage.prototype.pause = function () {
        console.log(this.streamingMedia);
        this.streamingMedia.pauseAudio();
        console.log(this.streamingMedia);
    };
    UploadPage.prototype.resume = function () {
        console.log(this.streamingMedia);
        this.streamingMedia.resumeAudio();
        console.log(this.streamingMedia);
    };
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
    UploadPage.prototype.cancelSearch = function (event) {
        this.someValue = "";
        this.global.toggled = false;
        this.queryupload = 'new';
    };
    UploadPage.prototype.toggle = function () {
        var _this = this;
        this.global.toggled = this.global.toggled ? false : true;
        this.queryupload = 'myupload';
        setTimeout(function () {
            _this.myInput.setFocus();
        }, 150);
    };
    UploadPage.prototype.segmentClick = function (event) {
        if (localStorage.getItem("user_id") != null) {
            this.queryupload = event;
            if (event == 'myupload') {
                this.uploaddeatils = [];
                this.uploadget();
            }
            else {
                this.getlanguages();
                this.getGenre();
            }
        }
        else {
            if (event == 'myupload') {
                this.uploaddeatils = [];
                this.uploadget();
            }
        }
    };
    UploadPage.prototype.Upload = function () {
        var _this = this;
        if (this.user_id == null) {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            //Android
            this.fileName = "";
            this.uploadURI = "";
            this.thumbnail = "";
            this.videotag = false;
            this.audiotag = false;
            if (this.platform.is('android')) {
                this.fileChooser.open()
                    .then(function (uri) {
                    var filedir = _this.file.dataDirectory + 'files/';
                    console.log(filedir);
                    var record_file = 'Movies';
                    _this.file.writeExistingFile(filedir, record_file, 'folder').then(function (res) {
                        console.log('res');
                    }).catch(function (err) { console.log(err.message); });
                    //this.uploadURI = uri;
                    console.log(JSON.stringify(uri));
                    _this.filePath.resolveNativePath(uri).then(function (filePath) {
                        /*this.filePathtest=(filePath).toString();
                        console.log(this.filePathtest)*/
                        _this.file.resolveLocalFilesystemUrl(filePath).then(function (fileEntry) {
                            return new Promise(function (resolve, reject) {
                                fileEntry.file(function (meta) { return resolve(meta); }, function (error) { return reject(error); });
                            });
                        }).then(function (fileMeta) {
                            //this.split_mimeType=fileMeta.type.split('/').toString()
                            console.log(JSON.stringify(fileMeta));
                            var type = fileMeta.type.split('/');
                            _this.file_type = type[0];
                            if (_this.file_type == 'video' || _this.file_type == 'audio') {
                                _this.uploadURI = uri;
                                _this.fileName = fileMeta.name;
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
                                if (_this.file_type == 'video') {
                                    var fileName = fileMeta.name;
                                    var dir = fileMeta['localURL'].split('/');
                                    console.log(dir);
                                    dir.pop();
                                    var fromDirectory = dir.join('/');
                                    var toDirectory = _this.file.dataDirectory;
                                    _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function () {
                                        var option = { fileUri: toDirectory + _this.fileName, width: 160, height: 206, atTime: 1, outputFileName: _this.fileName, quality: 50 };
                                        console.log(option);
                                        _this.playPath = _this.uploadURI;
                                        _this.videoEditor.createThumbnail(option).then(function (result) {
                                            //result-path of thumbnail
                                            _this.thumbnail = result;
                                        }).catch(function (e) {
                                            _this.fileName = "";
                                            _this.uploadURI = "";
                                            _this.showToast('bottom', 'Selected file is not supported!');
                                            console.log(e);
                                            // alert('fail video editor');
                                        });
                                    }, function (err) {
                                        console.log('err: ', err);
                                    });
                                }
                                else {
                                    _this.thumbnail = "assets/imgs/music1.jpg";
                                    _this.playPath = _this.uploadURI;
                                }
                            }
                            else {
                                _this.showToast('bottom', 'Selected file is not supported!');
                            }
                        });
                    });
                })
                    .catch(function (e) { return console.log(e); });
            }
            //iOS
            if (this.platform.is('ios')) {
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
                      this.playPath=this.file.dataDirectory+this.fileName;
                    }
                   }else{
                    this.showToast('bottom','Selected file is not supported!');
                   }
           
                  });
                 })
                .catch(err => console.log('Error', err));*/
            }
        }
    };
    UploadPage.prototype.uploadget = function () {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.inScreenLoader = true;
            if (this.user_id != null) {
                this.user = this.user_id;
            }
            else if (this.storeID != null) {
                this.user = this.storeID;
            }
            this.upload.uploaddisp(this.user) //,this.count_list
                .subscribe(function (res) {
                _this.inScreenLoader = false;
                _this.uploaddeatils = res;
                _this.menu.upload_count();
            }, function (error) {
                _this.inScreenLoader = false;
                _this.uploaddeatils = [];
                console.log(error);
            });
        }
        else {
            this.network_status = 1;
            this.uploaddeatils = [];
        }
    };
    UploadPage.prototype.getlanguages = function () {
        var _this = this;
        this.uploadService.getLanguages()
            .subscribe(function (res) {
            _this.languages = res;
        }, function (error) {
            console.log(error);
        });
    };
    UploadPage.prototype.languagePopUp = function (lang) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Languages');
        this.languages.forEach(function (l) {
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
            handler: function (id) {
                _this.LanguageId = id;
                for (var i = 0; i < _this.languages.length; i++) {
                    if (_this.languages[i].id == id) {
                        _this.LanguageName = _this.languages[i].language_name;
                    }
                }
            }
        });
        alert.present();
    };
    UploadPage.prototype.getGenre = function () {
        var _this = this;
        this.homeService.home_type()
            .subscribe(function (res) {
            _this.genres = res;
        }, function (error) {
            console.log(error);
        });
    };
    UploadPage.prototype.genrePopUp = function (genre) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Genres');
        this.genres.forEach(function (l) {
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
            handler: function (id) {
                _this.GenreId = id;
                for (var i = 0; i < _this.genres.length; i++) {
                    if (_this.genres[i].id == id) {
                        _this.genreName = _this.genres[i].genre_type;
                    }
                }
            }
        });
        alert.present();
    };
    UploadPage.prototype.uploadVideo = function () {
        var _this = this;
        this.progress = 0;
        this.progressbar = true;
        var fileTransfer = this.transfer.create();
        this.data = {
            "title": this.fileName,
            "path": this.uploadURI,
            "user_id": this.user_id,
            "language_id": this.LanguageId,
            "genre_id": this.GenreId,
            "file_type": this.file_type,
            "description": this.description
        };
        var options1 = {
            fileKey: 'video_upload_file',
            fileName: this.uploadURI,
            mimeType: 'multipart/form-data',
            params: this.data,
            chunkedMode: false,
            headers: { Connection: "close" }
        };
        /*this.presentLoading();*/
        fileTransfer.upload(this.uploadURI, this.global.baseUrl + '/users/new_upload', options1)
            .then(function (res) {
            console.log(res);
            /*this.loader.dismissAll();*/
            _this.progressbar = false;
            _this.datacheck = res.response;
            if (_this.datacheck == "true") {
                _this.fileName = "";
                _this.uploadURI = "";
                _this.LanguageId = "";
                _this.thumbnail = "";
                _this.GenreId = "";
                _this.description = "";
                _this.LanguageName = "Languages";
                _this.genreName = "Genres";
                _this.mediaFiles = [];
                _this.videotag = false;
                _this.audiotag = false;
                _this.playPath = "";
                localStorage.removeItem('videoNum');
                _this.showToast('bottom', _this.file_type + ' ' + 'is uploaded successfully!');
                _this.menu.upload_count();
            }
            else {
                _this.showToast('bottom', _this.file_type + ' ' + 'uploaded is failed!');
            }
            //this.flag_upload = true;
        }, function (err) {
            // error
            console.log(err);
            _this.progressbar = false;
            //this.loader.dismissAll();
            _this.showToast('bottom', _this.file_type + ' ' + 'uploaded is failed!');
        });
        fileTransfer.onProgress(function (progressEvent) {
            _this._zone.run(function () {
                if (progressEvent.lengthComputable) {
                    var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    _this.progress = perc;
                    console.log(perc);
                }
            });
        });
    };
    UploadPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: 'Uploading…'
        });
        this.loader.present();
    };
    UploadPage.prototype.showToast = function (position, message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: position
        });
        toast.present(toast);
    };
    UploadPage.prototype.doInfinite = function (infiniteScroll) {
        //this.count_list=this.count_list+10;
        var _this = this;
        setTimeout(function () {
            _this.upload.uploaddisp(_this.user) //,this.count_list
                .subscribe(function (res) {
                _this.uploaddeatils = res;
            }, function (error) {
                console.log(error);
            });
        }, 500);
    };
    __decorate([
        ViewChild('input'),
        __metadata("design:type", Object)
    ], UploadPage.prototype, "myInput", void 0);
    __decorate([
        ViewChild('myvideo'),
        __metadata("design:type", Object)
    ], UploadPage.prototype, "myVideo", void 0);
    __decorate([
        ViewChild('myaudio'),
        __metadata("design:type", Object)
    ], UploadPage.prototype, "myaudio", void 0);
    UploadPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-upload',
            templateUrl: 'upload.html',
        }),
        __metadata("design:paramtypes", [App, Nav, NavController, NavParams, Platform, AlertController, SocialSharing, MediaCapture, Media, FileChooser, ModalController, VotesProvider, Globals, ToastController, LoadingController, File, FilePath, FileTransfer, Toast, UploadProvider, HomeProvider, NotificationProvider, OneSignal, VideoEditor, NgZone, MenuPage, StreamingMedia])
    ], UploadPage);
    return UploadPage;
}());
export { UploadPage };
//# sourceMappingURL=upload.js.map