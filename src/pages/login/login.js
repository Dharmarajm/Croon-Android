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
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, ToastController } from 'ionic-angular';
//import { MenuPage } from '../menu/menu';
import { LoginProvider } from '../../providers/login/login';
import { Events } from 'ionic-angular';
import { Globals } from '../../providers/global';
import { MenuPage } from '../menu/menu';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, service, platform, alertCtrl, loadingCtrl, events, toastCtrl, global, menu, facebook, googlePlus) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.global = global;
        this.menu = menu;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.isAvailable = false;
        this.login = { emailid: '', password: '', player: this.player };
        platform.registerBackButtonAction(function () {
            _this.navCtrl.setRoot('MenuPage');
        }, 0);
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 600);
        if (localStorage.getItem("email_id") != '') {
            this.login.emailid = localStorage.getItem("email_id");
        }
        if (localStorage.getItem("password") != '') {
            this.login.password = localStorage.getItem("password");
        }
        if (localStorage.getItem("checked") == 'true') {
            this.check = true;
        }
        else {
            localStorage.removeItem("email_id");
            localStorage.removeItem("password");
            this.login.emailid = '';
            this.login.password = '';
            this.check = false;
        }
        this.player = localStorage.getItem("player_id");
    };
    LoginPage.prototype.rememberme = function () {
        localStorage.setItem("email_id", this.login.emailid);
        localStorage.setItem("password", this.login.password);
        localStorage.setItem("checked", this.check);
    };
    LoginPage.prototype.loginfb = function () {
        var _this = this;
        this.facebook.login(['email', 'public_profile']).then(function (response) {
            _this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                _this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
                _this.service.login_google_fb(_this.userData.email, null, 'facebook', _this.userData.picture, _this.userData.username, _this.player)
                    .subscribe(function (res) {
                    console.log(JSON.stringify(res));
                    _this.login_details = res;
                    _this.menu.user_id = _this.login_details.id;
                    _this.menu.user_name = _this.login_details.first_name;
                    if (_this.login_details.image.length != 0) {
                        _this.menu.user_image = _this.login_details.image[0].image_path.url;
                    }
                    localStorage.setItem("user_id", _this.login_details.id);
                    localStorage.setItem("user_name", _this.login_details.first_name);
                    localStorage.setItem("storeID", _this.login_details.id);
                    localStorage.setItem("login_status", _this.login_details.login_status);
                    if (_this.login_details.image.length != 0) {
                        localStorage.setItem("user_image", _this.login_details.image[0].image_path.url);
                    }
                    _this.navCtrl.setRoot('MenuPage');
                }, function (error) {
                    console.log(error);
                });
            });
        });
    };
    LoginPage.prototype.logingoogle = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            _this.service.login_google_fb(res.email, null, 'google', res.imageUrl, res.displayName, _this.player)
                .subscribe(function (res) {
                console.log(JSON.stringify(res));
                _this.login_details = res;
                _this.menu.user_id = _this.login_details.id;
                _this.menu.user_name = _this.login_details.first_name;
                if (_this.login_details.image.length != 0) {
                    _this.menu.user_image = _this.login_details.image[0].image_path.url;
                }
                localStorage.setItem("user_id", _this.login_details.id);
                localStorage.setItem("user_name", _this.login_details.first_name);
                localStorage.setItem("storeID", _this.login_details.id);
                localStorage.setItem("login_status", _this.login_details.login_status);
                if (_this.login_details.image.length != 0) {
                    localStorage.setItem("user_image", _this.login_details.image[0].image_path.url);
                }
                _this.navCtrl.setRoot('MenuPage');
            }, function (error) {
                console.log(error);
            });
        })
            .catch(function (err) { return console.error(err); });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.setRoot('SignupPage');
    };
    LoginPage.prototype.cancel = function () {
        this.navCtrl.setRoot('MenuPage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    LoginPage.prototype.forgotpassword = function () {
        this.navCtrl.setRoot('ForgotpasswordPage');
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.login.emailid == '' || this.login.emailid == null) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the email-id",
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else if (!email_validation.test(this.login.emailid)) {
            var alert_2 = this.alertCtrl.create({
                title: "Croon",
                message: "Invalid Email-ID",
                buttons: ['Ok']
            });
            alert_2.present();
        }
        else if (this.login.password == '' || this.login.password == null) {
            var alert_3 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the password",
                buttons: ['Ok']
            });
            alert_3.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.service.login(this.login.emailid.toLowerCase(), this.login.password, this.player)
                .subscribe(function (res) {
                loading_1.dismiss();
                _this.login_details = res;
                if (_this.login_details == false) {
                    _this.login.password = '';
                    var alert_4 = _this.alertCtrl.create({
                        title: "Croon",
                        message: "Invaild details",
                        buttons: ['Ok']
                    });
                    alert_4.present();
                }
                else if (_this.login_details.id > 0) {
                    _this.menu.user_id = _this.login_details.id;
                    _this.menu.user_name = _this.login_details.first_name;
                    if (_this.login_details.image.length != 0) {
                        _this.menu.user_image = _this.login_details.image[0].image_path.url;
                    }
                    localStorage.setItem("user_id", _this.login_details.id);
                    localStorage.setItem("user_name", _this.login_details.first_name);
                    if (_this.login_details.image.length != 0) {
                        localStorage.setItem("user_image", _this.login_details.image[0].image_path.url);
                    }
                    localStorage.setItem("storeID", _this.login_details.id);
                    console.log(localStorage.getItem("user_name"));
                    if (localStorage.getItem("user_name") == 'null') {
                        _this.navCtrl.setRoot('ProfilePage');
                    }
                    else if (localStorage.getItem("user_name") != 'null') {
                        _this.navCtrl.setRoot('MenuPage');
                    }
                    _this.events.publish('user:created', _this.user = localStorage.getItem("user_id"), Date.now());
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
    ], LoginPage.prototype, "myInput", void 0);
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LoginProvider, Platform, AlertController, LoadingController, Events, ToastController, Globals, MenuPage, Facebook, GooglePlus])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map