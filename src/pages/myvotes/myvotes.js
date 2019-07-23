var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, App, Nav } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ModalController } from 'ionic-angular';
import { VotesProvider } from '../../providers/myvotes/myvotes';
import { Globals } from '../../providers/global';
import { NotificationProvider } from '../../providers/notification/notification';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { Toast } from '@ionic-native/toast';
var MyvotesPage = /** @class */ (function () {
    function MyvotesPage(app, nav, navCtrl, navParams, platform, alertCtrl, socialSharing, modalCtrl, votes, global, loadingCtrl, notify, network, oneSignal, toast) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.modalCtrl = modalCtrl;
        this.votes = votes;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.network = network;
        this.oneSignal = oneSignal;
        this.toast = toast;
        this.queryhistory = 'music';
        this.votesdetails = [];
        this.counter = 0;
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
                        // console.log("exitapp");
                        platform.exitApp();
                    }
                }
                else {
                    _this.global.toggled = false;
                }
            }, 0);
            _this.triggerNotification();
        });
        //this.count_list=500;    
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
    MyvotesPage.prototype.ionViewDidLoad = function () {
        this.myvotesget();
    };
    MyvotesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.votesdetails = [];
        this.myvotesget();
        this.global.toggled = false;
        this.someValue = "";
        this.global.current_page = "MyvotesPage";
        this.ud_id = localStorage.getItem("storeID");
        if (this.ud_id != null) {
            this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                _this.notify_count = res._body;
            }, function (error) {
                console.log(error);
            });
        }
    };
    MyvotesPage.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '2000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    MyvotesPage.prototype.triggerNotification = function () {
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
    MyvotesPage.prototype.compilemsg = function (index) {
        //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
        var msg = "Hi i am Crooner";
        return msg.concat(" \n Sent from Croon App !");
    };
    MyvotesPage.prototype.regularShare = function (id) {
        //var msg = this.compilemsg(index);
        this.socialSharing.share(this.global.shareUrl + 'genres/croon_share?id=' + id);
    };
    MyvotesPage.prototype.cancelSearch = function (event) {
        this.someValue = "";
        this.global.toggled = false;
        this.myvotesget();
    };
    MyvotesPage.prototype.toggle = function () {
        var _this = this;
        this.global.toggled = this.global.toggled ? false : true;
        setTimeout(function () {
            _this.myInput.setFocus();
        }, 150);
    };
    MyvotesPage.prototype.goto_login = function () {
        this.navCtrl.setRoot('LoginPage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    MyvotesPage.prototype.openModal = function (user) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
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
            });
            modalPage.present();
        }
        else {
            this.network_status = 1;
            this.votesdetails = [];
        }
    };
    MyvotesPage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    MyvotesPage.prototype.myvotesget = function () {
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
            this.votes.votedisp(this.user) //uploaddisp
                .subscribe(function (res) {
                _this.inScreenLoader = false;
                _this.votesdetails = res;
            }, function (error) {
                _this.inScreenLoader = false;
                console.log(error);
            });
        }
        else {
            this.votesdetails = [];
            this.network_status = 1;
        }
    };
    __decorate([
        ViewChild('input'),
        __metadata("design:type", Object)
    ], MyvotesPage.prototype, "myInput", void 0);
    MyvotesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-myvotes',
            templateUrl: 'myvotes.html',
        }),
        __metadata("design:paramtypes", [App, Nav, NavController, NavParams, Platform, AlertController, SocialSharing, ModalController, VotesProvider, Globals, LoadingController, NotificationProvider, Network, OneSignal, Toast])
    ], MyvotesPage);
    return MyvotesPage;
}());
export { MyvotesPage };
//# sourceMappingURL=myvotes.js.map