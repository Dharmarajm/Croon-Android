var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ModalController, ViewController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { ViewProvider } from '../../providers/view/view';
import { Globals } from '../../providers/global';
import { HomeProvider } from '../../providers/home/home';
import { Media } from '@ionic-native/media';
import { DatePipe } from '@angular/common';
var ModalPage = /** @class */ (function () {
    function ModalPage(navCtrl, navParams, platform, socialSharing, viewCtrl, modalCtrl, viewservice, toastCtrl, alertCtrl, global, homeservice, datePipe, toast, media) {
        var _this = this;
        this.navCtrl = navCtrl;
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
        console.log(this.global.network_status);
        console.log('ionViewDidLoad ViewPage');
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
            console.log('stop');
            this.audioFile.stop();
            this.audioFile.release();
        }
        if (this.audioState == true) {
            this.audioState = false;
            this.audioFile.stop();
            this.audioFile.release();
        }
        console.log(this.audioFile);
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
            console.log('stop');
            this.audioFile.stop();
            this.audioFile.release();
        }
        if (this.audioState == true) {
            this.audioState = false;
            this.audioFile.stop();
            this.audioFile.release();
        }
        console.log(this.audioFile);
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
            console.log(_this.viewDetail);
        }, function (error) {
            console.log(error);
            _this.detailsScreenLoader = false;
        });
    };
    ModalPage.prototype.updateVote = function () {
        var _this = this;
        if (localStorage.getItem("which_page") == 'Uploadpage' || localStorage.getItem("which_page") == 'Homepage') {
            if (localStorage.getItem("user_id") != null) {
                var data = {
                    "user_id": this.userId,
                    "upload_id": this.UserDetails
                };
                this.viewservice.voteUpdate(data)
                    .subscribe(function (res) {
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
        console.log(this.count_list);
        this.commentsScreenLoader = true;
        this.viewservice.getComments_limit(this.UserDetails, this.count_list)
            .subscribe(function (res) {
            _this.commentsScreenLoader = false;
            if (res == null || res == []) {
                _this.setCmts = [];
            }
            else {
                _this.setCmts = res;
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
                console.log(res);
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
            console.log(res);
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
            console.log('play');
            this.audioFile.play();
        }
        else {
            if (this.audioState == false) {
                this.currentTrack.playing = false;
                console.log('pause');
                this.audioState = true;
                this.audioFile.pause();
            }
            else {
                this.audioFile.getCurrentPosition().then(function (position) {
                    // get file duration    
                    var duration = _this.audioFile.getDuration();
                    console.log(duration);
                    //get current position
                    var calcTime = position * 1000;
                    _this.audioFile.seekTo(calcTime);
                    _this.currentTrack.playing = true;
                    _this.audioState = false;
                    _this.audioFile.play();
                    console.log(position);
                });
            }
        }
    };
    ModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-modal',
            templateUrl: 'modal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, SocialSharing, ViewController, ModalController, ViewProvider, ToastController, AlertController, Globals, HomeProvider, DatePipe, Toast, Media])
    ], ModalPage);
    return ModalPage;
}());
export { ModalPage };
//# sourceMappingURL=modal.js.map