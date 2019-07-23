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
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController } from 'ionic-angular';
/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { SignupProvider } from '../../providers/signup/signup';
import { LoginPage } from './../login/login';
import { SignupPage } from './../signup/signup';
var TermsPage = /** @class */ (function () {
    function TermsPage(navCtrl, navParams, service, loadingCtrl, platform, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.signup = { emailid: '', password: '' };
    }
    TermsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
        this.signup.emailid = localStorage.getItem("email_id_signup");
        this.signup.password = localStorage.getItem("password_signup");
    };
    TermsPage.prototype.back = function () {
        this.navCtrl.setRoot(SignupPage);
    };
    TermsPage.prototype.terms = function (check_values) {
        this.check_terms = check_values;
    };
    TermsPage.prototype.gotologin_final = function () {
        var _this = this;
        if (this.check_terms == false || this.check_terms == '' || this.check_terms == undefined) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please select the terms and conditions",
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else if (this.check_terms == true) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.service.signup(this.signup.emailid.toLowerCase(), this.signup.password)
                .subscribe(function (res) {
                loading_1.dismiss();
                _this.signup_details = res;
                if (_this.signup_details == true) {
                    var toast = _this.toastCtrl.create({
                        message: 'Your registration completed!',
                        duration: 2000,
                        position: 'bottom'
                    });
                    toast.present();
                    _this.navCtrl.setRoot(LoginPage);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: "Croon",
                        message: "This email already exists",
                        buttons: ['Ok']
                    });
                    alert_2.present();
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
    TermsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-terms',
            templateUrl: 'terms.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, SignupProvider, LoadingController, Platform, AlertController, ToastController])
    ], TermsPage);
    return TermsPage;
}());
export { TermsPage };
//# sourceMappingURL=terms.js.map