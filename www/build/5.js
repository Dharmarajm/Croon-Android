webpackJsonp([5],{

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(341);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_menu__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_myvotes_myvotes__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { LoginPage } from './../login/login';







var ProfilePage = /** @class */ (function () {
    function ProfilePage(app, nav, navCtrl, navParams, platform, votes, imagePicker, base64, loadingCtrl, alertCtrl, menu, toast, global, oneSignal) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.votes = votes;
        this.imagePicker = imagePicker;
        this.base64 = base64;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
        this.toast = toast;
        this.global = global;
        this.oneSignal = oneSignal;
        this.ShowBack = true;
        if (localStorage.getItem("ProfileShow") == 'true') {
            this.ShowBack = false;
        }
        else {
            this.ShowBack = true;
        }
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                if (_this.ShowBack == true) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */]);
                }
            }, 0);
            _this.triggerNotification();
        });
        if (localStorage.getItem("user_image") != null) {
            this.imgPreview = localStorage.getItem("user_image");
            this.user_image = this.imgPreview;
        }
        else {
            this.imgPreview = "assets/imgs/profileIcon.jpg";
            this.user_image = null;
        }
        if (localStorage.getItem('user_name') != 'null') {
            this.prof_name = localStorage.getItem('user_name');
        }
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.triggerNotification = function () {
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
            /* }*/
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    ProfilePage.prototype.getPhoto = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
            quality: 90,
            width: 500,
            height: 500
        };
        this.imagePicker.getPictures(options).then(function (results) {
            //this.user_image = null;
            if (results.length != 0) {
                for (var i = 0; i < results.length; i++) {
                    _this.imgPreview = results[i];
                    _this.user_image = null;
                    _this.base64.encodeFile(results[i]).then(function (base64File) {
                        _this.image = base64File;
                    }, function (err) {
                        console.log(err);
                    });
                }
            }
            else {
                if (_this.user_image != null) {
                    _this.imgPreview = localStorage.getItem("user_image");
                }
                else {
                    _this.user_image = null;
                }
            }
        }, function (err) { console.log(err); });
    };
    ProfilePage.prototype.dashboard = function () {
        var _this = this;
        this.name = this.prof_name;
        if (this.image != "") {
            var data = {
                "image": this.image,
                "user_id": localStorage.getItem("user_id"),
                "user_name": this.name
            };
            this.showLoader();
            this.votes.register(data).subscribe(function (result) {
                var data = result;
                _this.loading.dismiss();
                if (data.image.length != 0) {
                    localStorage.setItem("user_image", data.image[0].image_path.url);
                }
                localStorage.setItem("user_name", data.first_name);
                _this.menu.user_id = data.id;
                _this.menu.user_name = data.first_name;
                if (data.image.length != 0) {
                    _this.menu.user_image = data.image[0].image_path.url;
                }
                _this.toast.show("Uploaded successfully", '2000', 'bottom').subscribe(function (toast) {
                    console.log(toast);
                });
            }, function (err) {
                _this.loading.dismiss();
                _this.toast.show("Uploading Failed", '2000', 'bottom').subscribe(function (toast) {
                    console.log(err);
                });
            });
        }
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */]);
    };
    ProfilePage.prototype.back = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */]);
    };
    ProfilePage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...'
        });
        this.loading.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/profile/profile.html"*/'<ion-content class="ion-content-profile">\n  <div class="header">\n    <span>\n      <button ion-button icon-only clear (click)="back()" *ngIf="ShowBack==true">\n       <ion-icon name="ios-arrow-back"></ion-icon>\n      </button>\n      <h4 [ngClass]="{\'text-success\':ShowBack==false}">My Profile</h4>\n    </span>\n    <img src="assets/imgs/logo.png">\n  </div>\n  <div class="profile-pic">\n    <img src="{{imgPreview}}" *ngIf="user_image==null">\n    <img src="{{imgPreview}}" *ngIf="user_image!=null">\n      <button ion-button icon-only (click)="getPhoto()">\n       <ion-icon name="md-create"></ion-icon>\n      </button>\n  </div>\n  <div class="form-proceed">\n    <ion-item>\n      <ion-label floating>Name</ion-label>\n      <ion-input type="text" id="profile_name" [(ngModel)]="prof_name"></ion-input>\n    </ion-item>\n    <button ion-button block id="profile_proceed_button" [disabled]="!prof_name" (click)="dashboard()">\n      Proceed \n      <ion-icon name="ios-arrow-forward"></ion-icon>\n    </button>\n  </div>\n</ion-content>\n\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__providers_myvotes_myvotes__["a" /* VotesProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_7__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__["a" /* OneSignal */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=5.js.map