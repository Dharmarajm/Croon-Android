webpackJsonp([10],{

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutPageModule", function() { return AboutPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about__ = __webpack_require__(334);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__about__["a" /* AboutPage */]),
            ],
        })
    ], AboutPageModule);
    return AboutPageModule;
}());

//# sourceMappingURL=about.module.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_onesignal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notification_notification__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AboutPage = /** @class */ (function () {
    function AboutPage(app, nav, navCtrl, navParams, platform, oneSignal, notify) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.oneSignal = oneSignal;
        this.notify = notify;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('MenuPage');
            }, 0);
            _this.triggerNotification();
        });
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.ud_id = localStorage.getItem("storeID");
        if (this.ud_id != null) {
            this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                _this.notify_count = res._body;
            }, function (error) {
                console.log(error);
            });
        }
    };
    AboutPage.prototype.triggerNotification = function () {
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
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0})
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
            else if (localStorage.getItem("noti_page") == "home") {
                //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0}) 
                _this.nav.setRoot('TabsPage', { tabIndex: 0 });
            }
            else {
                //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
                _this.nav.setRoot('TabsPage', { tabIndex: 3 });
            }
            /*}*/
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    AboutPage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/about/about.html"*/'<style type="text/css">\n  .about{\n    text-align: justify;\n    margin-bottom: 5px;\n    margin-right: 10px;\n  }\n</style>\n\n<ion-header>\n  <ion-toolbar color="dark-blue">\n    <span>\n      <button menuToggle ion-button icon-only clear>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </span>\n    <img src="assets/imgs/header-logo.png">\n    <span>\n      <button ion-button icon-only  (click)="notification()" clear>\n        <ion-icon name="ios-notifications-outline"></ion-icon>\n        <span class="notify" *ngIf="notify_count!=0" [hidden]="notify_count==undefined">{{notify_count}}</span>\n      </button>     \n    </span>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content id="about_details">\n<ul>\n  <li class="about">\n      Croon is a weekly competition app where people can upload or record audio/video clips (up to a minute long) of them singing, dancing, performing sports tricks or playing video game, etc.\n  </li>\n  <li class="about">\n      Competitions will be a week long and contestants can upload as many videos or audio clips as they want in all genres until a specified time.\n  </li>\n  <li class="about">\n      Once uploaded, contestants can share their uploads with all their friends and invite them to vote.\n  </li>\n  <li class="about">\n      Registered users will be given an opportunity to vote (up to one vote per upload) for all their favorite uploads.\n  </li>\n  <li class="about">\n      Contestants will be judged by other users based on the number of votes he/she gets. And the winners will be announced (for each genre) at the end of the week.\n  </li>\n  <li class="about">\n      Croon will send daily updates on the current vote tally to all the registered users, contestants and voters.\n  </li>\n  <li class="about">\n      If you want to watch your all time favorite uploads, Croon\'s history will have the past winners and uploads.\n  </li>\n</ul>\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_3__providers_notification_notification__["a" /* NotificationProvider */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ })

});
//# sourceMappingURL=10.js.map