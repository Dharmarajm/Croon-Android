webpackJsonp([2],{

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(333);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]),
            ],
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_signup_signup__ = __webpack_require__(232);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { TermsPage } from './../terms/terms';
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, service, loadingCtrl, platform, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.signup = { emailid: '', password: '', confrim: '' };
        platform.registerBackButtonAction(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        }, 0);
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 600);
    };
    SignupPage.prototype.back = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    SignupPage.prototype.gotologin = function () {
        var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.signup.emailid == '' || this.signup.emailid == null) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the Email-ID",
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else if (!email_validation.test(this.signup.emailid)) {
            var alert_2 = this.alertCtrl.create({
                title: "Croon",
                message: "Invalid Email-ID",
                buttons: ['Ok']
            });
            alert_2.present();
        }
        else if (this.signup.password == '' || this.signup.password == null) {
            var alert_3 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the password",
                buttons: ['Ok']
            });
            alert_3.present();
        }
        else if (this.signup.password.length < 5) {
            var alert_4 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the minmum 5 character in password field",
                buttons: ['Ok']
            });
            alert_4.present();
        }
        else if (this.signup.confrim == '' || this.signup.confrim == null) {
            var alert_5 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the confirm password",
                buttons: ['Ok']
            });
            alert_5.present();
        }
        else if (this.signup.password != this.signup.confrim) {
            this.signup.password = '';
            this.signup.confrim = '';
            var alert_6 = this.alertCtrl.create({
                title: "Croon",
                message: "Passwords do not match",
                buttons: ['Ok']
            });
            alert_6.present();
        }
        else {
            localStorage.setItem("email_id_signup", this.signup.emailid);
            localStorage.setItem("password_signup", this.signup.password);
            this.navCtrl.setRoot('TermsPage');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "myInput", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/signup/signup.html"*/'<ion-content class="ion-content">\n  <div class="header">\n    <span>\n      <button ion-button icon-only clear id="signup_back_button" (click)="back()">\n       <ion-icon name="ios-arrow-back"></ion-icon>\n      </button>\n      <h4>Signup</h4>\n    </span>\n    <img src="assets/imgs/logo.png">\n  </div>\n  <form class="login-form">\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" id="signup_emailid" #myInput [(ngModel)]="signup.emailid" [ngModelOptions]="{standalone: true}" autofocus></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" minlength="5" maxlength="10" id="signup_password" [(ngModel)]="signup.password" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Confirm Password</ion-label>\n      <ion-input type="password" id="signup_confirm_password" [(ngModel)]="signup.confrim" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n    <br>\n\n    <button ion-button block id="signup_save_button" (click)="gotologin()">Next</button> \n   \n</form>\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_signup_signup__["a" /* SignupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=2.js.map