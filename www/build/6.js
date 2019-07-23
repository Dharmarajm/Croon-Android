webpackJsonp([6],{

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalPageModule", function() { return ModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal__ = __webpack_require__(338);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalPageModule = /** @class */ (function () {
    function ModalPageModule() {
    }
    ModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal__["a" /* ModalPage */]),
            ],
        })
    ], ModalPageModule);
    return ModalPageModule;
}());

//# sourceMappingURL=modal.module.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_view_view__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_media__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ModalPage = /** @class */ (function () {
    function ModalPage(navCtrl, actionSheetCtrl, navParams, platform, socialSharing, viewCtrl, modalCtrl, viewservice, toastCtrl, alertCtrl, global, homeservice, datePipe, toast, media) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.socialSharing = socialSharing;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.viewservice = viewservice;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.homeservice = homeservice;
        this.datePipe = datePipe;
        this.toast = toast;
        this.media = media;
        this.currentTrack = { playing: false };
        this.audioState = false;
        this.detailsScreenLoader = false;
        this.commentsScreenLoader = false;
        this.Reports = [{ 'id': 1, 'report': 'Sexual content' }, { 'id': 2, 'report': 'Violent or repulsive content' }, { 'id': 3, 'report': 'Hateful or abusive content' }, { 'id': 4, 'report': 'Harmful dangerous acts' }, { 'id': 5, 'report': 'Child abuse' }, { 'id': 6, 'report': 'Infringes my rights' }, { 'id': 7, 'report': 'Promotes terrorism' }, { 'id': 8, 'report': 'Spam or misleading' }];
        this.readMore = true;
        this.text = 'more';
        //test:string='Breaking India: Western Interventions fdgfsfdgds'
        this.voteClick = false;
        this.count_list = 10;
        this.UserDetails = localStorage.getItem("ViewDetails");
        this.Page_status = localStorage.getItem("which_page");
        this.global.modalActive = true;
        if (localStorage.getItem("user_id") != null) {
            this.userId = localStorage.getItem("user_id");
        }
        else {
            this.userId = null;
        }
        platform.registerBackButtonAction(function () {
            _this.viewCtrl.dismiss();
        }, 0);
    }
    ModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ViewPage');
        this.user_rank = localStorage.getItem("rank");
        //console.log(this.user_rank)
        var user = this.UserDetails;
        this.allupload_details(user);
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.getCmts();
            this.voteStatus();
        }
        else {
            this.network_status = 1;
        }
    };
    ModalPage.prototype.Network = function () {
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.getCmts();
            this.voteStatus();
        }
        else {
            this.network_status = 1;
        }
    };
    ModalPage.prototype.network_check = function () {
        if (this.global.network_status == 2) {
            this.network_status = 2;
        }
        else {
            this.network_status = 1;
        }
    };
    ModalPage.prototype.ionViewWillLeave = function () {
        this.global.modalActive = false;
        localStorage.removeItem("noti_page");
        localStorage.removeItem("noti_genre_id");
        localStorage.removeItem("noti_genre_type");
        if (this.currentTrack.playing == true) {
            this.currentTrack.playing = false;
            this.audioState = false;
            this.audioFile.stop();
            this.audioFile.release();
        }
        if (this.audioState == true) {
            this.audioState = false;
            this.audioFile.stop();
            this.audioFile.release();
        }
    };
    ModalPage.prototype.commants_date = function (data) {
        this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.updateddate = this.datePipe.transform(data, 'yyyy-MM-dd');
        if (this.myDate == this.updateddate) {
            return data;
        }
    };
    ModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
        this.global.modalActive = false;
        localStorage.removeItem("noti_page");
        localStorage.removeItem("noti_genre_id");
        localStorage.removeItem("noti_genre_type");
        if (this.currentTrack.playing == true) {
            this.currentTrack.playing = false;
            this.audioState = false;
            this.audioFile.stop();
            this.audioFile.release();
        }
        if (this.audioState == true) {
            this.audioState = false;
            this.audioFile.stop();
            this.audioFile.release();
        }
    };
    ModalPage.prototype.compilemsg = function (index) {
        //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
        var msg = "Hi i am Crooner";
        return msg.concat(" \n Sent from Croon App !");
    };
    ModalPage.prototype.regularShare = function (index) {
        this.socialSharing.share(this.global.shareUrl + 'genres/croon_share?id=' + this.UserDetails);
        //this.socialSharing.share("Check this item:  croon://home/",null,null,null)
    };
    ModalPage.prototype.disablecomment = function () {
        if (localStorage.getItem("user_id") != null) {
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
    };
    ModalPage.prototype.allupload_details = function (user) {
        var _this = this;
        this.detailsScreenLoader = true;
        this.homeservice.model_upload(user).subscribe(function (res) {
            _this.viewDetail = res[0];
            _this.detailsScreenLoader = false;
        }, function (error) {
            console.log(error);
            _this.detailsScreenLoader = false;
        });
    };
    ModalPage.prototype.updateVote = function () {
        var _this = this;
        if (localStorage.getItem("which_page") == 'Uploadpage' || localStorage.getItem("which_page") == 'Homepage') {
            if (localStorage.getItem("user_id") != null) {
                this.voteClick = true;
                var data = {
                    "user_id": this.userId,
                    "upload_id": this.UserDetails
                };
                this.viewservice.voteUpdate(data)
                    .subscribe(function (res) {
                    _this.voteClick = false;
                    if (res._body == 'vote') {
                        _this.voteIcon = true;
                        _this.viewDetail.votes.length = _this.viewDetail.votes.length + 1;
                    }
                    else if (res._body == 'unvote') {
                        _this.voteIcon = false;
                        _this.viewDetail.votes.length = _this.viewDetail.votes.length - 1;
                    }
                    else {
                    }
                }, function (error) {
                    _this.voteClick = false;
                    console.log(error);
                });
            }
            else {
                var toast = this.toastCtrl.create({
                    message: 'Login to your Croon account',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
        }
    };
    ModalPage.prototype.getCmts = function () {
        var _this = this;
        this.commentsScreenLoader = true;
        this.viewservice.getComments_limit(this.UserDetails, this.count_list)
            .subscribe(function (res) {
            _this.commentsScreenLoader = false;
            if (res == null || res == []) {
                _this.setCmts = [];
            }
            else {
                _this.setCmts = res;
                if (_this.setCmts.length == _this.count_list) {
                    _this.infinite_count = 1;
                }
                else {
                    _this.infinite_count = 2;
                }
            }
        }, function (error) {
            console.log(error);
            _this.commentsScreenLoader = false;
        });
    };
    ModalPage.prototype.uploadCmts = function () {
        var _this = this;
        var data = {
            "user_id": this.userId,
            "upload_id": this.UserDetails,
            "message": this.Comments
        };
        this.Comments = "";
        this.viewservice.uploadCmts(data)
            .subscribe(function (res) {
            if (res.id != null) {
                _this.getCmts();
            }
            else {
                console.log('Comments updated is failed');
            }
        }, function (error) {
            console.log(error);
        });
    };
    ModalPage.prototype.voteStatus = function () {
        var _this = this;
        this.viewservice.Votestatus(this.userId, this.UserDetails)
            .subscribe(function (res) {
            if (res == true) {
                _this.voteIcon = true;
            }
            else {
                _this.voteIcon = false;
            }
        }, function (error) {
            console.log(error);
        });
    };
    ModalPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        this.count_list = this.count_list + 10;
        setTimeout(function () {
            if (_this.global.network_status == 2) {
                _this.network_status = 2;
                _this.viewservice.getComments_limit(_this.UserDetails, _this.count_list)
                    .subscribe(function (res) {
                    if (res == null || res == []) {
                        _this.setCmts = [];
                    }
                    else {
                        _this.setCmts = res;
                        if (_this.setCmts.length == _this.count_list) {
                            _this.infinite_count = 1;
                        }
                        else {
                            _this.infinite_count = 2;
                        }
                        infiniteScroll.complete();
                    }
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                _this.network_status = 1;
                infiniteScroll.complete();
            }
        }, 500);
    };
    ModalPage.prototype.playAudio = function () {
        var _this = this;
        if (this.currentTrack.playing == false && this.audioState == false) {
            var data = this.global.imageUrl + '' + this.viewDetail.path.url;
            this.audioFile = this.media.create(data);
            this.currentTrack.playing = true;
            this.audioFile.play();
        }
        else {
            if (this.audioState == false) {
                this.currentTrack.playing = false;
                this.audioState = true;
                this.audioFile.pause();
            }
            else {
                this.audioFile.getCurrentPosition().then(function (position) {
                    // get file duration    
                    var duration = _this.audioFile.getDuration();
                    //get current position
                    var calcTime = position * 1000;
                    _this.audioFile.seekTo(calcTime);
                    _this.currentTrack.playing = true;
                    _this.audioState = false;
                    _this.audioFile.play();
                });
            }
        }
    };
    ModalPage.prototype.reportPopUp = function () {
        var _this = this;
        if (localStorage.getItem("user_id") != null) {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Report',
                buttons: [
                    {
                        text: 'Report This Content',
                        //role: 'destructive',
                        handler: function () {
                            var alert = _this.alertCtrl.create();
                            alert.setTitle('Report' + ' ' + _this.viewDetail.file_type);
                            _this.Reports.forEach(function (l) {
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
                                handler: function (id) {
                                    if (id != undefined || id != null) {
                                        _this.ReportId = id;
                                        for (var i = 0; i < _this.Reports.length; i++) {
                                            if (_this.Reports[i].id == id) {
                                                _this.reportName = _this.Reports[i].report;
                                            }
                                        }
                                        var data = {
                                            "user_id": _this.userId,
                                            "upload_id": _this.UserDetails,
                                            "description": _this.reportName
                                        };
                                        _this.viewservice.Reportstatus(data)
                                            .subscribe(function (res) {
                                            if (res == true) {
                                                _this.toast.show("This Content has been reported successfully", '2000', 'bottom').subscribe(function (toast) {
                                                });
                                            }
                                            else {
                                                _this.toast.show("This Content has been already reported", '2000', 'bottom').subscribe(function (toast) {
                                                });
                                            }
                                        }, function (error) {
                                            _this.toast.show("Please try again later", '2000', 'bottom').subscribe(function (toast) {
                                            });
                                            console.log(error);
                                        });
                                    }
                                }
                            });
                            alert.present();
                        }
                    }, {
                        text: 'Report This User',
                        handler: function () {
                            console.log('Archive clicked');
                            var reportData = {
                                "user_id": localStorage.getItem("user_id"),
                                "block_user": _this.viewDetail.user["id"]
                            };
                            _this.viewservice.Reportuser(reportData).subscribe(function (res) {
                                if (res == true) {
                                    _this.toast.show("User has been reported successfully", '2000', 'bottom').subscribe(function (toast) {
                                    });
                                }
                                else {
                                    _this.toast.show("User has been already reported", '2000', 'bottom').subscribe(function (toast) {
                                    });
                                }
                            }, function (error) {
                                _this.toast.show("Please try again later", '2000', 'bottom').subscribe(function (toast) {
                                });
                                console.log(error);
                            });
                        }
                    }, {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            actionSheet.present();
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
    };
    ModalPage.prototype.read = function () {
        this.readMore = this.readMore ? false : true;
        if (this.readMore == true) {
            this.text = 'more';
        }
        else {
            this.text = 'less';
        }
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modal',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/modal/modal.html"*/'<ion-content>\n  <div class="stream" autofocus="true" *ngIf="!detailsScreenLoader">\n    <!-- <button ion-button icon-only clear (click)="closeModal()">\n      <ion-icon name="ios-close-circle" style="margin-top: 15px"></ion-icon>\n    </button> -->\n    <ion-fab top left (click)="closeModal()">\n     <button ion-fab mini><ion-icon name="ios-close-circle-outline"></ion-icon></button>\n    </ion-fab>\n    <video controls="controls" controlsList="nodownload" preload="auto" *ngIf="viewDetail?.file_type==\'video\'">\n        <source type="video/mp4" src="{{viewDetail?.path.url}}.mp4">\n        <source type="video/mov" src="{{viewDetail?.path.url}}.mp4"> \n        <source type="video/ogg" src="{{viewDetail?.path.url}}.mp4">\n        <source type="video/x-matroska" src="{{viewDetail?.path.url}}.mp4">\n    </video>\n    \n    <div class="audio" *ngIf="viewDetail?.file_type==\'audio\'">\n    <!-- <ion-row>\n        <ion-col width="33"></ion-col>\n        <ion-col width="33">\n                <button  (click)="playAudio()" *ngIf="!currentTrack.playing" color="light" clear ion-button icon-only><ion-icon name="play-outline"></ion-icon></button>\n                \n                <button  (click)="playAudio()" *ngIf="currentTrack.playing" color="light" clear ion-button icon-only><ion-icon name="pause-outline"></ion-icon></button>\n        </ion-col>\n       <ion-col width="33"></ion-col>\n      </ion-row> -->\n      <img src="assets/imgs/music2.jpg">\n      <!-- <button  (click)="playAudio()" *ngIf="!currentTrack.playing" color="light" clear ion-button icon-only><ion-icon name="play-outline"></ion-icon></button><button  (click)="playAudio()" *ngIf="currentTrack.playing" color="light" clear ion-button icon-only><ion-icon name="pause-outline"></ion-icon></button> -->\n      <audio preload controls controlsList="nodownload">\n          <source type="audio/mp3" src="{{viewDetail?.path.url}}.wav">\n          <source type="audio/mpeg" src="{{viewDetail?.path.url}}.wav">\n          <source type="audio/wav" src="{{viewDetail?.path.url}}.wav">\n          <source type="audio/ogg" src="{{viewDetail?.path.url}}.wav">\n      </audio>\n    </div>\n  </div>\n  <div *ngIf="network_status == 2">\n  <div class="play_bg">\n    <div class="play_content" *ngIf="!detailsScreenLoader">\n      <span>\n        <h2>{{viewDetail?.title}}</h2>\n        <p><span><ion-icon name="ios-person-outline"></ion-icon>{{viewDetail?.user.first_name}}</span><span><ion-icon name="ios-star-outline"></ion-icon>{{viewDetail?.votes.length}} Votes</span><span><ion-icon name="ios-trophy-outline"></ion-icon>Rank {{user_rank}}</span></p>\n       <!--  <input type="checkbox" class="read-more-state" id="post-1" />\n        <p class="read-more-wrap"><span class="read-more-target">{{viewDetail?.description}}</span><label for="post-1" class="read-more-trigger"></label></p>\n        <label for="post-1" class="read-more-trigger"></label> -->\n        <!-- <p class="media_description">{{viewDetail?.description}}</p> -->\n      </span>\n\n      <p class="media_description" *ngIf="viewDetail?.description.length <=40 ">{{viewDetail?.description}}</p>\n      <p class="media_description" [ngClass]="{\'text-success\':readMore==true,\'text-failure\':readMore==false}" *ngIf="viewDetail?.description.length>40">{{viewDetail?.description}}</p>\n      <button (click)="read()" *ngIf="viewDetail?.description.length>40" class="read">Read {{text}}</button>\n\n      <span class="vote">\n      <div *ngIf="Page_status == \'Homepage\' || Page_status == \'Uploadpage\'">\n        <button ion-button icon-only clear (click)="updateVote()" [hidden]="voteClick">   \n          <ion-icon \n            [name]="voteIcon ? \'ios-star\' :\'ios-star-outline\'"  [ngClass]="{ \'noStar\': voteIcon === false,\'star\': voteIcon === true }">\n          </ion-icon>\n          <p>Vote</p>\n        </button>\n        <button ion-button icon-only clear [hidden]="!voteClick">   \n          <ion-spinner name="bubbles"></ion-spinner>\n        </button>\n      </div>\n        <button ion-button icon-only (click)="regularShare(i)" clear>\n          <ion-icon name="md-share" ></ion-icon>\n          <p>Share</p>\n        </button>\n\n        <button ion-button icon-only (click)="reportPopUp()" clear *ngIf="userId!=viewDetail.user.id">\n          <ion-icon name="md-flag" ></ion-icon>\n          <p>Report</p>\n        </button>\n      </span>\n\n     <!--  <div class="vote1">\n        <button ion-button icon-only (click)="reportPopUp()" clear>\n          <ion-icon name="flag"></ion-icon>\n          <p>Report</p>\n        </button>\n      </div> -->\n    </div>\n   \n    <ion-item class="comment" (click)="disablecomment()" *ngIf="!commentsScreenLoader">\n      <ion-avatar item-start>\n        <img src="assets/imgs/dynm-img.png">\n      </ion-avatar>\n      <div class="input-comment">\n        <input type="text" name="" placeholder="Comment.." [(ngModel)]="Comments" [disabled]="userId ? null:\'\'">\n        <button ion-button icon-only clear (click)="uploadCmts()" [disabled]="!Comments">\n          <ion-icon name="md-arrow-forward"></ion-icon>\n        </button>\n      </div>\n    </ion-item>\n    <ion-list inset class="user_list" *ngIf="!commentsScreenLoader">\n      <ion-item *ngFor="let user of setCmts">\n        <ion-avatar item-start>\n          <img src="assets/imgs/contactIcon.png" *ngIf="user.user.image.length==0 || user.user.image[0].image_path.url==null">\n          <img src="{{user.user.image[0].image_path.url}}" *ngIf="user.user.image.length!=0 && user.user.image[0].image_path.url!=null">\n        </ion-avatar>\n        <h2>{{user.message}}</h2>\n        <p>\n          <span><ion-icon name="ios-person-outline"></ion-icon>{{user.user.first_name}}</span>\n        </p>\n\n        \n        <ion-note item-end *ngIf="commants_date(user.updated_at) == user.updated_at">{{user.updated_at | date: \'HH:mm a\'}}</ion-note>\n        <ion-note item-end *ngIf="commants_date(user.updated_at) != user.updated_at">{{user.updated_at | date: \'dd-MM-yyyy\'}}</ion-note>\n        \n      </ion-item>\n    </ion-list>\n\n\n    <div *ngIf="infinite_count == 1">\n      <ion-infinite-scroll (ionInfinite)="doInfinite1($event)">\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">       \n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n    </div> \n\n\n    <div class="no_matches" *ngIf="commentsScreenLoader || detailsScreenLoader">\n      <img src="assets/imgs/rotating-ring-loader.gif">\n    </div>   \n  </div>\n</div>\n<div class="no_internet1" *ngIf="network_status == 1">\n            <img src="assets/imgs/no_internet.png">\n            <h5>Oops!!</h5>\n            <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n            <button ion-button color="light" round item-end icon-start (click)="Network()">\n                <ion-icon name="refresh"></ion-icon> Try again\n            </button>\n</div>\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/modal/modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_view_view__["a" /* ViewProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_6__providers_home_home__["a" /* HomeProvider */], __WEBPACK_IMPORTED_MODULE_8__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_media__["a" /* Media */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ })

});
//# sourceMappingURL=6.js.map