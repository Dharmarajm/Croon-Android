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
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { SignupProvider } from '../../providers/signup/signup';
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
            _this.navCtrl.setRoot(LoginPage);
        }, 0);
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad SignupPage');
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 600);
    };
    SignupPage.prototype.back = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    SignupPage.prototype.gotologin = function () {
        var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.signup.emailid == '' || this.signup.emailid == null) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the email-id",
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
                message: "Please enter the confrim password",
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
        ViewChild('myInput'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "myInput", void 0);
    SignupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-signup',
            templateUrl: 'signup.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, SignupProvider, LoadingController, Platform, AlertController, ToastController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.js.map