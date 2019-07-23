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
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform, App, Nav } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { ChangepasswordProvider } from '../../providers/changepassword/changepassword';
import { OneSignal } from '@ionic-native/onesignal';
var ChangepasswordPage = /** @class */ (function () {
    function ChangepasswordPage(app, nav, navCtrl, service, loadingCtrl, navParams, alertCtrl, toastCtrl, platform, oneSignal) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.oneSignal = oneSignal;
        this.change = { emailid: '', password: '', new_password: '' };
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('MenuPage');
            }, 0);
            _this.triggerNotification();
        });
    }
    ChangepasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ChangepasswordPage');
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 600);
    };
    ChangepasswordPage.prototype.triggerNotification = function () {
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
                        _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                    }
                    else {
                        _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                    }
                }
                else if (localStorage.getItem("noti_page") == "home") {
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    ChangepasswordPage.prototype.goto_login = function () {
        var _this = this;
        var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.change.emailid == '' || this.change.emailid == null) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the email-id",
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else if (!email_validation.test(this.change.emailid)) {
            var alert_2 = this.alertCtrl.create({
                title: "Croon",
                message: "Invalid Email-ID",
                buttons: ['Ok']
            });
            alert_2.present();
        }
        else if (this.change.password == '' || this.change.password == null) {
            var alert_3 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the old password",
                buttons: ['Ok']
            });
            alert_3.present();
        }
        else if (this.change.password.length < 5) {
            var alert_4 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the minmum 5 character in password field",
                buttons: ['Ok']
            });
            alert_4.present();
        }
        else if (this.change.new_password == '' || this.change.new_password == null) {
            var alert_5 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the new password",
                buttons: ['Ok']
            });
            alert_5.present();
        }
        else if (this.change.new_password.length < 5) {
            var alert_6 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the minmum 5 character",
                buttons: ['Ok']
            });
            alert_6.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.service.changepassword(this.change.emailid.toLowerCase(), this.change.password, this.change.new_password)
                .subscribe(function (res) {
                loading_1.dismiss();
                _this.change_details = res;
                if (_this.change_details == true) {
                    _this.navCtrl.setRoot(LoginPage);
                    var toast = _this.toastCtrl.create({
                        message: 'Your password has been changed',
                        duration: 2000,
                        position: 'bottom'
                    });
                    toast.present();
                }
                else {
                    _this.change.new_password = '';
                    _this.change.password = '';
                    var alert_7 = _this.alertCtrl.create({
                        title: "Croon",
                        message: "Invalid details",
                        buttons: ['Ok']
                    });
                    alert_7.present();
                }
            }, function (error) {
                loading_1.dismiss();
                console.log(error);
                var alert = _this.alertCtrl.create({
                    title: "Server error",
                    message: "There are issues connecting to Croon.please try again later.",
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
    };
    __decorate([
        ViewChild('myInput'),
        __metadata("design:type", Object)
    ], ChangepasswordPage.prototype, "myInput", void 0);
    ChangepasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-changepassword',
            templateUrl: 'changepassword.html',
        }),
        __metadata("design:paramtypes", [App, Nav, NavController, ChangepasswordProvider, LoadingController, NavParams, AlertController, ToastController, Platform, OneSignal])
    ], ChangepasswordPage);
    return ChangepasswordPage;
}());
export { ChangepasswordPage };
//# sourceMappingURL=changepassword.js.map