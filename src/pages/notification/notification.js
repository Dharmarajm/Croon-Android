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
import { IonicPage, NavController, NavParams, LoadingController, Platform, App, Nav } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { Globals } from '../../providers/global';
import { ModalController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
/* Generated class for the NotificationPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/
var NotificationPage = /** @class */ (function () {
    function NotificationPage(app, nav, navCtrl, navParams, notify, global, modalCtrl, loadingCtrl, platform, oneSignal) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.notify = notify;
        this.global = global;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.oneSignal = oneSignal;
        this.all_notify = [];
        this.inScreenLoader = false;
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.count_list = 10;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.pop();
            }, 0);
            _this.triggerNotification();
        });
    }
    NotificationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.global.network_status == 2) {
            this.ud_id = localStorage.getItem("storeID");
            if (this.ud_id != null) {
                this.inScreenLoader = true;
                console.log(this.ud_id);
                this.notify.notificationList_limit(this.ud_id, this.count_list).subscribe(function (res) {
                    _this.inScreenLoader = false;
                    _this.network_status = 2;
                    _this.all_notify = res;
                    _this.noti_count = _this.all_notify.length;
                }, function (error) {
                    _this.network_status = 1;
                    _this.inScreenLoader = false;
                    console.log(error);
                });
            }
            else {
                this.all_notify = [];
                this.noti_count = 0;
                this.network_status = 2;
            }
        }
        else {
            this.all_notify = [];
            this.network_status = 1;
        }
    };
    NotificationPage.prototype.ionViewWillEnter = function () {
        console.log('test');
        this.tabBarElement.style.display = 'none';
        if (this.global.network_status == 2) {
            this.network_status = 2;
        }
        else {
            this.network_status = 1;
            this.all_notify = [];
        }
    };
    NotificationPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    NotificationPage.prototype.triggerNotification = function () {
        var _this = this;
        this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d');
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
                        //this.navCtrl.parent.select(0);
                        _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                    }
                    else {
                        //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                        //this.navCtrl.parent.select(3);
                        _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                    }
                }
                else if (localStorage.getItem("noti_page") == "home") {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0})
                    //this.navCtrl.parent.select(0); 
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                    //this.navCtrl.parent.select(3); 
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    NotificationPage.prototype.openModal = function (user, id) {
        var _this = this;
        if (this.global.network_status == 2) {
            console.log(user);
            localStorage.setItem("ViewDetails", user);
            var modalPage = this.modalCtrl.create('ModalPage');
            modalPage.onDidDismiss(function () {
                _this.ud_id = localStorage.getItem("storeID");
                if (_this.ud_id != null) {
                    console.log(_this.ud_id);
                    _this.inScreenLoader = true;
                    _this.notify.notificationList_limit(_this.ud_id, _this.count_list).subscribe(function (res) {
                        _this.inScreenLoader = false;
                        _this.network_status = 2;
                        _this.all_notify = res;
                        _this.noti_count = _this.all_notify.length;
                    }, function (error) {
                        _this.network_status = 1;
                        _this.inScreenLoader = false;
                        console.log(error);
                    });
                }
                else {
                    _this.all_notify = [];
                    _this.noti_count = 0;
                    _this.network_status = 2;
                }
            });
            modalPage.present();
        }
        else {
            this.network_status = 1;
            this.all_notify = [];
        }
    };
    NotificationPage.prototype.notify_status = function (id) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.notify.notificationDetails(id).subscribe(function (res) {
                _this.noti_status = res;
                console.log(_this.noti_status);
            }, function (error) {
                console.log(error);
            });
            this.ud_id = localStorage.getItem("storeID");
            if (this.ud_id != null) {
                console.log(this.ud_id);
                this.inScreenLoader = true;
                this.notify.notificationList_limit(this.ud_id, this.count_list).subscribe(function (res) {
                    _this.inScreenLoader = false;
                    _this.network_status = 2;
                    _this.all_notify = res;
                    _this.noti_count = _this.all_notify.length;
                }, function (error) {
                    _this.network_status = 1;
                    _this.inScreenLoader = false;
                    console.log(error);
                });
            }
            else {
                this.all_notify = [];
                this.noti_count = 0;
                this.network_status = 2;
            }
        }
        else {
            this.network_status = 1;
            this.all_notify = [];
        }
    };
    NotificationPage.prototype.Network = function () {
        var _this = this;
        if (this.global.network_status == 2) {
            this.ud_id = localStorage.getItem("storeID");
            if (this.ud_id != null) {
                console.log(this.ud_id);
                this.inScreenLoader = true;
                this.notify.notificationList_limit(this.ud_id, this.count_list).subscribe(function (res) {
                    _this.inScreenLoader = false;
                    _this.network_status = 2;
                    _this.all_notify = res;
                    _this.noti_count = _this.all_notify.length;
                }, function (error) {
                    _this.network_status = 1;
                    _this.inScreenLoader = false;
                    console.log(error);
                });
            }
            else {
                this.all_notify = [];
                this.noti_count = 0;
                this.network_status = 2;
            }
        }
        else {
            this.network_status = 1;
        }
    };
    NotificationPage.prototype.notify_delete = function (id) {
        var _this = this;
        if (this.global.network_status == 2) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.notify.notificationDelete(id).subscribe(function (res) {
                //let trash = res;
                // this.notify.notificationList_limit(this.count_list).subscribe(res => {
                //   loading.dismiss();
                //   this.all_notify =  res;
                //   this.noti_count = this.all_notify.length;
                // },
                // error => {
                // loading.dismiss();
                // console.log(error);
                // });
                _this.ud_id = localStorage.getItem("storeID");
                if (_this.ud_id != null) {
                    _this.notify.notificationList_limit(_this.ud_id, _this.count_list).subscribe(function (res) {
                        loading_1.dismiss();
                        _this.network_status = 2;
                        _this.all_notify = res;
                        _this.noti_count = _this.all_notify.length;
                    }, function (error) {
                        _this.network_status = 1;
                        loading_1.dismiss();
                        console.log(error);
                    });
                }
                else {
                    _this.all_notify = [];
                    _this.noti_count = 0;
                    _this.network_status = 2;
                }
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.network_status = 1;
            this.all_notify = [];
        }
    };
    NotificationPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.count_list = this.count_list + 10;
            setTimeout(function () {
                // this.notify.notificationList_limit(this.count_list).subscribe(res => {
                //   this.all_notify =  res;
                //   infiniteScroll.complete();
                //   this.noti_count = this.all_notify.length;
                // },
                // error => {
                //   console.log(error);
                // });
                _this.ud_id = localStorage.getItem("storeID");
                if (_this.ud_id != null) {
                    _this.notify.notificationList_limit(_this.ud_id, _this.count_list).subscribe(function (res) {
                        _this.all_notify = res;
                        infiniteScroll.complete();
                        _this.noti_count = _this.all_notify.length;
                    }, function (error) {
                        console.log(error);
                    });
                }
                else {
                    _this.all_notify = [];
                    _this.noti_count = 0;
                    _this.network_status = 2;
                }
            }, 500);
        }
        else {
            this.network_status = 1;
            this.all_notify = [];
        }
    };
    NotificationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-notification',
            templateUrl: 'notification.html',
        }),
        __metadata("design:paramtypes", [App, Nav, NavController, NavParams, NotificationProvider, Globals, ModalController, LoadingController, Platform, OneSignal])
    ], NotificationPage);
    return NotificationPage;
}());
export { NotificationPage };
//# sourceMappingURL=notification.js.map