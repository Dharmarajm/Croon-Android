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
import { IonicPage, NavController, NavParams, LoadingController, Platform, AlertController, ToastController } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { ForgotpasswordProvider } from '../../providers/forgotpassword/forgotpassword';
var ForgotpasswordPage = /** @class */ (function () {
    function ForgotpasswordPage(navCtrl, service, loadingCtrl, navParams, platform, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.forgot = { emailid: '', otp: '', password: '', confrim: '' };
        platform.registerBackButtonAction(function () {
            _this.navCtrl.setRoot(LoginPage);
        }, 0);
    }
    ForgotpasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ForgotpasswordPage');
        this.otp_box = 0;
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 600);
    };
    ForgotpasswordPage.prototype.goto_login = function () {
        var _this = this;
        var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.otp_box == 0) {
            if (this.forgot.emailid == '' || this.forgot.emailid == null) {
                var alert_1 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Please enter the email-id",
                    buttons: ['Ok']
                });
                alert_1.present();
            }
            else if (!email_validation.test(this.forgot.emailid)) {
                var alert_2 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Invalid Email-ID",
                    buttons: ['Ok']
                });
                alert_2.present();
            }
            else {
                var loading_1 = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_1.present();
                this.service.forgotpassword(this.forgot.emailid.toLowerCase())
                    .subscribe(function (res) {
                    localStorage.setItem("email_id_forgot", _this.forgot.emailid.toLowerCase());
                    loading_1.dismiss();
                    _this.forgot_details = res;
                    if (_this.forgot_details == true) {
                        _this.otp_box = 1;
                        var alert_3 = _this.alertCtrl.create({
                            title: "Croon",
                            message: "OTP is sent to your Email-id",
                            buttons: ['Ok']
                        });
                        alert_3.present();
                    }
                    else {
                        var alert_4 = _this.alertCtrl.create({
                            title: "Croon",
                            message: "Invalid details",
                            buttons: ['Ok']
                        });
                        alert_4.present();
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
        }
        else if (this.otp_box == 1) {
            if (this.forgot.otp == '' || this.forgot.otp == null) {
                var alert_5 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Please enter the OTP",
                    buttons: ['Ok']
                });
                alert_5.present();
            }
            else {
                var loading_2 = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_2.present();
                this.service.forgotpassword_otp(this.forgot.emailid.toLowerCase(), this.forgot.otp)
                    .subscribe(function (res) {
                    localStorage.setItem("otp_forgot", _this.forgot.otp);
                    loading_2.dismiss();
                    _this.forgot_details_otp = res;
                    if (_this.forgot_details_otp == true) {
                        _this.otp_box = 2;
                        var toast = _this.toastCtrl.create({
                            message: 'Your OTP is verified successfully',
                            duration: 2000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                    else {
                        _this.forgot.otp = '';
                        var alert_6 = _this.alertCtrl.create({
                            title: "Croon",
                            message: "Invalid details",
                            buttons: ['Ok']
                        });
                        alert_6.present();
                    }
                }, function (error) {
                    loading_2.dismiss();
                    console.log(error);
                    var alert = _this.alertCtrl.create({
                        title: "Server error",
                        message: "There are issues connecting to Croon.please try again later.",
                        buttons: ['Ok']
                    });
                    alert.present();
                });
            }
        }
        else if (this.otp_box == 2) {
            if (this.forgot.password == '' || this.forgot.password == null) {
                var alert_7 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Please enter the password",
                    buttons: ['Ok']
                });
                alert_7.present();
            }
            else if (this.forgot.password.length < 5) {
                var alert_8 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Please enter the minimum 5 character in password field",
                    buttons: ['Ok']
                });
                alert_8.present();
            }
            else if (this.forgot.confrim == '' || this.forgot.confrim == null) {
                var alert_9 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Please enter the confirm password",
                    buttons: ['Ok']
                });
                alert_9.present();
            }
            else if (this.forgot.password != this.forgot.confrim) {
                this.forgot.password = '';
                this.forgot.confrim = '';
                var alert_10 = this.alertCtrl.create({
                    title: "Croon",
                    message: "Passwords do not match",
                    buttons: ['Ok']
                });
                alert_10.present();
            }
            else {
                var loading_3 = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_3.present();
                this.service.forgotpassword_final(this.forgot.emailid.toLowerCase(), this.forgot.otp, this.forgot.password)
                    .subscribe(function (res) {
                    loading_3.dismiss();
                    _this.forgot_details_final = res;
                    if (_this.forgot_details_final == true) {
                        _this.navCtrl.setRoot('LoginPage');
                    }
                    else {
                        _this.forgot.password = '';
                        _this.forgot.confrim = '';
                        var alert_11 = _this.alertCtrl.create({
                            title: "Croon",
                            message: "Invalid details",
                            buttons: ['Ok']
                        });
                        alert_11.present();
                    }
                }, function (error) {
                    loading_3.dismiss();
                    console.log(error);
                    var alert = _this.alertCtrl.create({
                        title: "Server error",
                        message: "There are issues connecting to Croon.please try again later.",
                        buttons: ['Ok']
                    });
                    alert.present();
                });
            }
        }
    };
    ForgotpasswordPage.prototype.back = function () {
        this.navCtrl.setRoot(LoginPage);
    };
    __decorate([
        ViewChild('myInput'),
        __metadata("design:type", Object)
    ], ForgotpasswordPage.prototype, "myInput", void 0);
    ForgotpasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-forgotpassword',
            templateUrl: 'forgotpassword.html',
        }),
        __metadata("design:paramtypes", [NavController, ForgotpasswordProvider, LoadingController, NavParams, Platform, AlertController, ToastController])
    ], ForgotpasswordPage);
    return ForgotpasswordPage;
}());
export { ForgotpasswordPage };
//# sourceMappingURL=forgotpassword.js.map