webpackJsonp([8],{

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangepasswordPageModule", function() { return ChangepasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__changepassword__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChangepasswordPageModule = /** @class */ (function () {
    function ChangepasswordPageModule() {
    }
    ChangepasswordPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__changepassword__["a" /* ChangepasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__changepassword__["a" /* ChangepasswordPage */]),
            ],
        })
    ], ChangepasswordPageModule);
    return ChangepasswordPageModule;
}());

//# sourceMappingURL=changepassword.module.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangepasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_changepassword_changepassword__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
            localStorage.setItem("player_id", id.userId);
        });
        this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            // handle received here how you wish.
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (result) {
            _this.assignPush = JSON.stringify(result.notification.isAppInFocus);
            _this.getPushData = result.notification.payload.additionalData;
            localStorage.setItem("action", _this.assignPush);
            /*if(localStorage.getItem("action") == 'false'){
              
            }else{*/
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
            /*}*/
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
                message: "Please enter the Email-ID",
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
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], ChangepasswordPage.prototype, "myInput", void 0);
    ChangepasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-changepassword',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/changepassword/changepassword.html"*/'<ion-header>\n  <ion-toolbar color="dark-blue">\n    <span>\n      <button menuToggle ion-button icon-only clear>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </span>\n    <img src="assets/imgs/header-logo.png">\n    <span>\n      <button ion-button icon-only clear>\n        <!-- <ion-icon name="ios-notifications-outline"></ion-icon>\n        <span class="notify">06</span> -->\n      </button>      \n    </span>\n  </ion-toolbar>\n</ion-header>\n<ion-content class="ion-content">\n  <form class="login-form">\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" id="change_email" #myInput [(ngModel)]="change.emailid" [ngModelOptions]="{standalone: true}" autofocus></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Old Password</ion-label>\n      <ion-input type="password" minlength="5" maxlength="10" id="change_password" [(ngModel)]="change.password" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>New Password</ion-label>\n      <ion-input type="password" id="change_new_password" [(ngModel)]="change.new_password" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n    <br>\n    <button ion-button block id="change_save_button" (click)="goto_login()">SAVE</button>\n</form>\n</ion-content>\n\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/changepassword/changepassword.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_changepassword_changepassword__["a" /* ChangepasswordProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */]])
    ], ChangepasswordPage);
    return ChangepasswordPage;
}());

//# sourceMappingURL=changepassword.js.map

/***/ })

});
//# sourceMappingURL=8.js.map