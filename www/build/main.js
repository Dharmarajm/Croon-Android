webpackJsonp([11],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login_login__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { MenuPage } from '../menu/menu';






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
        })
            .catch(function (e) {
            console.log('Error logging into Facebook', e);
        });
    };
    LoginPage.prototype.logingoogle = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            _this.service.login_google_fb(res.email, null, 'google', res.imageUrl, res.displayName, _this.player)
                .subscribe(function (res) {
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
                message: "Please enter the Email-ID",
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
                        message: "Invalid details",
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
                    if (localStorage.getItem("user_name") == 'null') {
                        localStorage.setItem("ProfileShow", 'true');
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "myInput", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/login/login.html"*/'<ion-content class="ion-content">\n\n	<div class="images_logo">\n		<img src="assets/imgs/logo.png">\n	</div>\n	<form class="login-form">\n		  <ion-item>\n		    <ion-label floating>Email</ion-label>\n		    <ion-input type="email" id="login_email" #myInput [(ngModel)]="login.emailid" [ngModelOptions]="{standalone: true}"></ion-input>\n		  </ion-item>\n\n		  <ion-item>\n		    <ion-label floating>Password</ion-label>\n		    <ion-input type="password" id="login_password" [(ngModel)]="login.password" [ngModelOptions]="{standalone: true}"></ion-input>\n		  </ion-item>\n	  \n	   \n	   <ion-item>\n		  <ion-label (click)="rememberme()">Remember Me</ion-label>\n		  <ion-checkbox (click)="rememberme()" [(ngModel)]="check" (change)="check = !check" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n		</ion-item>\n\n\n	   <div class="login-btn">\n			<button ion-button block id="login_later" (click)="cancel()">Later</button>\n			<button ion-button block id="login_button" (click)="doLogin()">Login</button>\n	   </div>\n	    <div class="forgot">\n	    	<button ion-button clear id="forgot_button" (click)="forgotpassword()">FORGOT PASSWORD?</button>\n	    </div>\n	    <div class="login-with">\n	    	<label>Login with</label>\n	    	<div class="social-login">\n				<button ion-button icon-only id="login_with_facebook" (click)="loginfb()">\n					<i class="ti ti-facebook"></i>\n				</button>\n				<button ion-button icon-only id="login_with_google" (click)="logingoogle()">\n					<i class="ti ti-google"></i>\n				</button>\n	    	</div>\n	    </div>\n         <div class="register">\n			<h5>Not a Crooner yet? <a id="signup_page" (click)="signup()">Sign up</a></h5>\n         </div>\n	</form>\n	\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_login_login__["a" /* LoginProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 131:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 131;

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		322,
		10
	],
	"../pages/audio-modal/audio-modal.module": [
		323,
		9
	],
	"../pages/changepassword/changepassword.module": [
		325,
		8
	],
	"../pages/forgotpassword/forgotpassword.module": [
		324,
		7
	],
	"../pages/history/history.module": [
		175
	],
	"../pages/home/home.module": [
		179
	],
	"../pages/login/login.module": [
		177
	],
	"../pages/menu/menu.module": [
		178
	],
	"../pages/modal/modal.module": [
		326,
		6
	],
	"../pages/myvotes/myvotes.module": [
		180
	],
	"../pages/notification/notification.module": [
		181
	],
	"../pages/profile/profile.module": [
		330,
		5
	],
	"../pages/search/search.module": [
		327,
		4
	],
	"../pages/settings/settings.module": [
		328,
		3
	],
	"../pages/signup/signup.module": [
		329,
		2
	],
	"../pages/tabs/tabs.module": [
		331,
		1
	],
	"../pages/terms/terms.module": [
		332,
		0
	],
	"../pages/upload/upload.module": [
		182
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 172;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginProvider = /** @class */ (function () {
    function LoginProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello LoginProvider Provider');
    }
    LoginProvider.prototype.login = function (emailid, password, player) {
        return this.http.post(this.global.baseUrl + '/users/login', { "email_id": emailid, "password": password, "player_id": player });
    };
    LoginProvider.prototype.login_google_fb = function (email_id, password, login_status, image_path, name, player) {
        return this.http.post(this.global.baseUrl + '/users/social_media_registration', { "email_id": email_id, "password": password, "login_status": login_status, "image_path": image_path, "name": name, "player_id": player });
    };
    LoginProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], LoginProvider);
    return LoginProvider;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryPageModule", function() { return HistoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HistoryPageModule = /** @class */ (function () {
    function HistoryPageModule() {
    }
    HistoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__history__["a" /* HistoryPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], HistoryPageModule);
    return HistoryPageModule;
}());

//# sourceMappingURL=history.module.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HistoryProvider = /** @class */ (function () {
    function HistoryProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello HistoryProvider Provider');
    }
    HistoryProvider.prototype.history_dates = function () {
        return this.http.get(this.global.baseUrl + '/users/competitions');
    };
    HistoryProvider.prototype.history_paticular_dates = function (name, start_date) {
        return this.http.get(this.global.baseUrl + '/users/competition_select?data=' + name + '&&start_date=' + start_date);
    };
    HistoryProvider.prototype.history_music_details = function (dates_id, genre_id) {
        return this.http.get(this.global.baseUrl + '/users/history?competition_transaction_id=' + dates_id + '&&genre_id=' + genre_id);
    };
    HistoryProvider.prototype.history_music_details_limit = function (dates_id, genre_id, count) {
        return this.http.get(this.global.baseUrl + '/users/history?competition_transaction_id=' + dates_id + '&&genre_id=' + genre_id + '&&limit=' + count);
    };
    HistoryProvider.prototype.history_type = function () {
        return this.http.get(this.global.baseUrl + '/users/genres');
    };
    HistoryProvider.prototype.history_type_first = function () {
        return this.http.get(this.global.baseUrl + '/users/genres_first');
    };
    HistoryProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], HistoryProvider);
    return HistoryProvider;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyvotesPageModule", function() { return MyvotesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myvotes__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MyvotesPageModule = /** @class */ (function () {
    function MyvotesPageModule() {
    }
    MyvotesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__myvotes__["a" /* MyvotesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__myvotes__["a" /* MyvotesPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], MyvotesPageModule);
    return MyvotesPageModule;
}());

//# sourceMappingURL=myvotes.module.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NotificationPageModule = /** @class */ (function () {
    function NotificationPageModule() {
    }
    NotificationPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__notification__["a" /* NotificationPage */]),
            ],
        })
    ], NotificationPageModule);
    return NotificationPageModule;
}());

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadPageModule", function() { return UploadPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upload__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var UploadPageModule = /** @class */ (function () {
    function UploadPageModule() {
    }
    UploadPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__upload__["a" /* UploadPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__upload__["a" /* UploadPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], UploadPageModule);
    return UploadPageModule;
}());

//# sourceMappingURL=upload.module.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UploadProvider = /** @class */ (function () {
    function UploadProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello UploadProvider Provider');
    }
    UploadProvider.prototype.getLanguages = function () {
        return this.http.get(this.global.baseUrl + '/users/languages')
            .map(function (response) { return response.json(); });
    };
    UploadProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Globals */]])
    ], UploadProvider);
    return UploadProvider;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupProvider = /** @class */ (function () {
    function SignupProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello SignupProvider Provider');
    }
    SignupProvider.prototype.signup = function (emailid, password) {
        return this.http.post(this.global.baseUrl + '/users/register', { "email_id": emailid, "password": password });
    };
    SignupProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], SignupProvider);
    return SignupProvider;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotpasswordProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotpasswordProvider = /** @class */ (function () {
    function ForgotpasswordProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello ForgotpasswordProvider Provider');
    }
    ForgotpasswordProvider.prototype.forgotpassword = function (emailid) {
        return this.http.get(this.global.baseUrl + '/users/forgot_password?email_id=' + emailid);
    };
    ForgotpasswordProvider.prototype.forgotpassword_otp = function (emailid, otp) {
        return this.http.get(this.global.baseUrl + '/users/get_otp?email_id=' + emailid + '&&otp=' + otp);
    };
    ForgotpasswordProvider.prototype.forgotpassword_final = function (emailid, otp, password) {
        return this.http.put(this.global.baseUrl + '/users/set_password', { "email_id": emailid, "otp": otp, "password": password });
    };
    ForgotpasswordProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ForgotpasswordProvider);
    return ForgotpasswordProvider;
}());

//# sourceMappingURL=forgotpassword.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangepasswordProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChangepasswordProvider = /** @class */ (function () {
    function ChangepasswordProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello ChangepasswordProvider Provider');
    }
    ChangepasswordProvider.prototype.changepassword = function (emailid, password, new_password) {
        return this.http.put(this.global.baseUrl + '/users/change_password', { "email_id": emailid, "password": password, "new_password": new_password });
    };
    ChangepasswordProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ChangepasswordProvider);
    return ChangepasswordProvider;
}());

//# sourceMappingURL=changepassword.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the ViewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ViewProvider = /** @class */ (function () {
    function ViewProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello ViewProvider Provider');
    }
    ViewProvider.prototype.getComments = function (id) {
        return this.http.get(this.global.baseUrl + '/users/comments?upload_id=' + id)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.getComments_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/comments?upload_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.uploadCmts = function (data) {
        return this.http.post(this.global.baseUrl + '/users/post_comments', data)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.voteUpdate = function (data) {
        return this.http.post(this.global.baseUrl + '/users/post_vote', data);
    };
    ViewProvider.prototype.Votestatus = function (userId, uploadId) {
        return this.http.get(this.global.baseUrl + '/users/check_vote?user_id=' + userId + '&&upload_id=' + uploadId)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.Reportstatus = function (data) {
        return this.http.post(this.global.baseUrl + '/users/my_upload_report', data)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.Reportuser = function (data) {
        return this.http.post(this.global.baseUrl + '/users/block_user', data)
            .map(function (response) { return response.json(); });
    };
    ViewProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Globals */]])
    ], ViewProvider);
    return ViewProvider;
}());

//# sourceMappingURL=view.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchProvider = /** @class */ (function () {
    function SearchProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello SearchProvider Provider');
    }
    SearchProvider.prototype.homeTopList = function (keyword) {
        return this.http.get(this.global.baseUrl + '/users/search_toplist?keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    SearchProvider.prototype.historyOrder = function (keyword, limit) {
        return this.http.get(this.global.baseUrl + '/users/search_history?keyword=' + keyword + '&&limit=' + limit)
            .map(function (response) { return response.json(); });
    };
    SearchProvider.prototype.home_keywords_list = function (keyword) {
        return this.http.get(this.global.baseUrl + '/users/search_keyword?keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    SearchProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Globals */]])
    ], SearchProvider);
    return SearchProvider;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(259);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_base64__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_onesignal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__scroll_hide__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login_module__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_menu_menu_module__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_home_module__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_upload_upload_module__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_notification_notification_module__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_myvotes_myvotes_module__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_history_history_module__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_media__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_media_capture__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_file__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_chooser__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_path__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_transfer__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_video_editor__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_view_view__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_myvotes_myvotes__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_history_history__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_login_login__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_signup_signup__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_changepassword_changepassword__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_forgotpassword_forgotpassword__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_search_search__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__providers_upload_upload__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__providers_notification_notification__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_network__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_facebook__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__angular_common__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_android_permissions__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_streaming_media__ = __webpack_require__(189);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import { HockeyApp } from 'ionic-hockeyapp';










































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__scroll_hide__["a" /* ScrollHideDirective */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    menuType: 'overlay',
                    pageTransition: 'ios-transition'
                }, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/audio-modal/audio-modal.module#AudioModalPageModule', name: 'AudioModalPage', segment: 'audio-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgotpassword/forgotpassword.module#ForgotpasswordPageModule', name: 'ForgotpasswordPage', segment: 'forgotpassword', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/changepassword/changepassword.module#ChangepasswordPageModule', name: 'ChangepasswordPage', segment: 'changepassword', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/history/history.module#HistoryPageModule', name: 'HistoryPage', segment: 'history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/myvotes/myvotes.module#MyvotesPageModule', name: 'MyvotesPage', segment: 'myvotes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/notification/notification.module#NotificationPageModule', name: 'NotificationPage', segment: 'notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal/modal.module#ModalPageModule', name: 'ModalPage', segment: 'modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/upload/upload.module#UploadPageModule', name: 'UploadPage', segment: 'upload', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/terms/terms.module#TermsPageModule', name: 'TermsPage', segment: 'terms', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_14__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_15__pages_menu_menu_module__["MenuPageModule"],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_17__pages_upload_upload_module__["UploadPageModule"],
                __WEBPACK_IMPORTED_MODULE_18__pages_notification_notification_module__["NotificationPageModule"],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_20__pages_history_history_module__["HistoryPageModule"],
                __WEBPACK_IMPORTED_MODULE_19__pages_myvotes_myvotes_module__["MyvotesPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                //HockeyApp,
                __WEBPACK_IMPORTED_MODULE_37__providers_global__["a" /* Globals */],
                __WEBPACK_IMPORTED_MODULE_31__providers_myvotes_myvotes__["a" /* VotesProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_history_history__["a" /* HistoryProvider */],
                __WEBPACK_IMPORTED_MODULE_29__providers_home_home__["a" /* HomeProvider */],
                __WEBPACK_IMPORTED_MODULE_30__providers_view_view__["a" /* ViewProvider */],
                __WEBPACK_IMPORTED_MODULE_33__providers_login_login__["a" /* LoginProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_signup_signup__["a" /* SignupProvider */],
                __WEBPACK_IMPORTED_MODULE_35__providers_changepassword_changepassword__["a" /* ChangepasswordProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_forgotpassword_forgotpassword__["a" /* ForgotpasswordProvider */],
                __WEBPACK_IMPORTED_MODULE_38__providers_search_search__["a" /* SearchProvider */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_media_capture__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_base64__["a" /* Base64 */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_video_editor__["a" /* VideoEditor */],
                __WEBPACK_IMPORTED_MODULE_39__providers_upload_upload__["a" /* UploadProvider */],
                __WEBPACK_IMPORTED_MODULE_40__providers_notification_notification__["a" /* NotificationProvider */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* Slides */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_44__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_streaming_media__["a" /* StreamingMedia */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_history_history__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_notification_notification__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HistoryPage = /** @class */ (function () {
    function HistoryPage(app, nav, platform, navCtrl, service, navParams, modalCtrl, global, loadingCtrl, alertCtrl, toastCtrl, notify, network, oneSignal, viewCtrl, toast) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.service = service;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.notify = notify;
        this.network = network;
        this.oneSignal = oneSignal;
        this.viewCtrl = viewCtrl;
        this.toast = toast;
        // @ViewChild('input') myInput;
        this.queryhistory = 'music';
        this.toggled = false;
        this.isenabled = false;
        this.btnColor_pre = '#002b3d';
        this.btnColor_next = '#002b3d';
        this.colors_pre = '#ffffff';
        this.colors_next = '#ffffff';
        this.counter = 0;
        this.inScreenLoader = false;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                if (_this.counter == 0) {
                    _this.counter++;
                    _this.presentToast();
                    setTimeout(function () { _this.counter = 0; }, 3000);
                }
                else {
                    // console.log("exitapp");
                    platform.exitApp();
                }
            }, 0);
            _this.triggerNotification();
        });
        this.count_list = 10;
    }
    HistoryPage.prototype.ionViewDidLoad = function () {
        this.first = true;
        this.Network(this.current_type);
    };
    HistoryPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.endtempdate = localStorage.getItem('endTmpDate');
        this.starttempdate = localStorage.getItem('startTmpDate');
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.global.current_page = "HistoryPage";
            this.ud_id = localStorage.getItem("storeID");
            if (this.ud_id != null) {
                this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                    _this.notify_count = res._body;
                }, function (error) {
                    console.log(error);
                });
            }
            if (this.types != undefined) {
                if (this.types.length == 0 && this.first == false && localStorage.getItem("noti_genre_type") == undefined) {
                    this.network_status = 1;
                }
            }
            if (this.types == undefined && this.first == false) {
                this.Network(this.current_type);
            }
        }
        else {
            this.network_status = 1;
            this.history_music_Result = [];
            this.history_music_values = [];
        }
        if (this.first == true) {
            this.first = false;
        }
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                if (_this.counter == 0) {
                    _this.counter++;
                    _this.presentToast();
                    setTimeout(function () { _this.counter = 0; }, 3000);
                }
                else {
                    _this.platform.exitApp();
                }
            }, 0);
            console.log('trigger');
            _this.triggerNotification();
        });
    };
    HistoryPage.prototype.ionViewDidEnter = function () {
        this.btnColor_pre = '#002b3d';
        this.btnColor_next = '#002b3d';
        this.colors_pre = '#ffffff';
        this.colors_next = '#ffffff';
    };
    HistoryPage.prototype.triggerNotification = function () {
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
                if (localStorage.getItem("noti_page") == "history") {
                    _this.getSlide = { "genre_type": _this.getPushData.value.genre.genre_type, "id": _this.getPushData.value.id };
                    _this.type(_this.getSlide);
                }
                else {
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
            }
            else if (localStorage.getItem("noti_page") == "home") {
                _this.nav.setRoot('TabsPage', { tabIndex: 0 });
            }
            else {
            }
            /*}*/
        });
        this.oneSignal.endInit();
    };
    HistoryPage.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '3000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    HistoryPage.prototype.Network = function (status) {
        var _this = this;
        if (localStorage.getItem("noti_genre_type") != undefined) {
            this.current_type = localStorage.getItem("noti_genre_type");
            this.service.history_type_first().subscribe(function (res) {
                _this.network_status = 2;
                _this.types_first = res;
                _this.function_switch(1);
            }, function (error) {
                _this.network_status = 1;
                console.log(error);
            });
        }
        else if (this.types_first == undefined || this.types_first == null) {
            this.service.history_type_first()
                .subscribe(function (res) {
                _this.network_status = 2;
                _this.types_first = res;
                _this.function_switch(1);
            }, function (error) {
                _this.network_status = 1;
                _this.types = [];
                console.log(error);
            });
        }
        else if (this.types == undefined || this.types == null) {
            this.function_switch(1);
        }
        else {
            this.function_switch(1);
        }
    };
    HistoryPage.prototype.onSegmentChanged = function (segmentButton) {
        var selectedIndex = this.types.findIndex(function (slide) {
            return slide.genre_type === segmentButton.value;
        });
        this.slider.slideTo(selectedIndex);
    };
    HistoryPage.prototype.onSlideChanged = function (slider) {
        if (this.types.length > slider._activeIndex) {
            var currentSlide = this.types[slider._activeIndex];
            this.history_music_Result = [];
            this.history_music_values = [];
            this.type(currentSlide);
        }
    };
    HistoryPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.global.network_status == 2) {
                _this.network_status = 2;
                _this.service.history_dates()
                    .subscribe(function (res) {
                    _this.start_end_dates = res;
                    _this.Current = Object.keys(_this.start_end_dates).length;
                    _this.start_date = _this.start_end_dates[0].start_date;
                    _this.end_date = _this.start_end_dates[0].end_date;
                    _this.dates_id = _this.start_end_dates[0].id;
                    _this.genre_id = _this.current_type_id;
                    _this.count_list = _this.count_list + 10;
                    _this.service.history_music_details_limit(_this.dates_id, _this.genre_id, _this.count_list)
                        .subscribe(function (res) {
                        infiniteScroll.complete();
                        _this.history_music_values = res;
                        if (Object.keys(_this.history_music_values).length == 0) {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                        else {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                infiniteScroll.complete();
            }
        }, 500);
    };
    HistoryPage.prototype.function_switch = function (grade) {
        var _this = this;
        switch (grade) {
            case 1: {
                // getting the dates of id 
                this.inScreenLoader = true;
                this.service.history_dates()
                    .subscribe(function (res) {
                    _this.network_status = 2;
                    _this.start_end_dates = res;
                    _this.Current = Object.keys(_this.start_end_dates).length;
                    _this.start_date = res[0].start_date;
                    localStorage.setItem('startTmpDate', res[_this.Current - 1].start_date);
                    _this.end_date = res[0].end_date;
                    localStorage.setItem('endTmpDate', _this.end_date);
                    _this.starttempdate = localStorage.getItem('startTmpDate');
                    _this.endtempdate = localStorage.getItem('endTmpDate');
                    _this.dates_id = res[0].id;
                    _this.function_switch(2);
                }, function (error) {
                    _this.network_status = 1;
                    _this.inScreenLoader = false;
                    console.log(error);
                });
                break;
            }
            case 2: {
                // getting the type of id
                this.service.history_type()
                    .subscribe(function (res) {
                    _this.types = res;
                    for (var i = 0; i < Object.keys(_this.types).length; i++) {
                        if (_this.current_type != undefined || _this.current_type != null) {
                            if (_this.types[i].genre_type == _this.current_type) {
                                _this.genre_id = _this.types[i].id;
                                _this.current_type = _this.types[i].genre_type;
                                _this.current_type_id = _this.types[i].id;
                                _this.selectedSegment = _this.types[i].genre_type;
                                _this.function_switch(3);
                            }
                        }
                        else {
                            if (_this.types[i].genre_type == _this.types_first.genre_type) {
                                _this.genre_id = _this.types_first.id;
                                _this.current_type = _this.types_first.genre_type;
                                _this.current_type_id = _this.types_first.id;
                                _this.selectedSegment = _this.types_first.genre_type;
                                _this.function_switch(3);
                            }
                        }
                    }
                }, function (error) {
                    console.log(error);
                    _this.inScreenLoader = false;
                });
                break;
            }
            case 3: {
                //let loading = this.loadingCtrl.create({
                //  content: 'Please wait...'
                //});
                //loading.present();       
                // getting details
                this.service.history_music_details_limit(this.dates_id, this.genre_id, this.count_list)
                    .subscribe(function (res) {
                    // loading.dismiss();          
                    _this.history_music_values = res;
                    _this.inScreenLoader = false;
                    if (Object.keys(_this.history_music_values).length == 0) {
                        _this.history_music_Result = Object.keys(_this.history_music_values).length;
                    }
                    else {
                        _this.history_music_Result = Object.keys(_this.history_music_values).length;
                    }
                    if (localStorage.getItem("noti_genre_type") != undefined) {
                        var user = localStorage.getItem("ViewDetails");
                        var rank = localStorage.getItem("rank");
                        _this.openModal(user, rank);
                    }
                }, function (error) {
                    // loading.dismiss(); 
                    console.log(error);
                    _this.inScreenLoader = false;
                    /*let alert = this.alertCtrl.create({
                      title: `Server error`,
                      message: `There are issues connecting to Croon.please try again later.`,
                      buttons: ['Ok']
                    });
                    alert.present();*/
                });
                break;
            }
            default: {
                console.log("Invalid choice");
                break;
            }
        }
    };
    HistoryPage.prototype.previous = function (name) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.inScreenLoader = true;
            this.history_music_Result = [];
            this.history_music_values = [];
            this.btnColor_pre = '#fccb2b';
            this.btnColor_next = '#002b3d';
            this.colors_pre = '#002b3d';
            this.colors_next = '#ffffff';
            this.isenabled = true;
            this.service.history_paticular_dates(name, this.start_date)
                .subscribe(function (res) {
                _this.start_end_dates = res;
                if (_this.start_end_dates != null) {
                    _this.start_date = _this.start_end_dates.start_date;
                    _this.end_date = _this.start_end_dates.end_date;
                    _this.dates_id = _this.start_end_dates.id;
                    if (localStorage.getItem('startTmpDate') == _this.start_date) {
                        _this.btnColor_pre = '#002b3d';
                        _this.colors_pre = '#ffffff';
                    }
                    _this.service.history_music_details_limit(_this.dates_id, _this.genre_id, _this.count_list)
                        .subscribe(function (res) {
                        _this.history_music_values = res;
                        _this.inScreenLoader = false;
                        if (Object.keys(_this.history_music_values).length == 0) {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                        else {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                    }, function (error) {
                        _this.inScreenLoader = false;
                        console.log(error);
                    });
                }
            }, function (error) {
                console.log(error);
                _this.inScreenLoader = false;
            });
        }
        else {
            this.network_status = 1;
            this.history_music_Result = [];
            this.history_music_values = [];
        }
    };
    HistoryPage.prototype.next = function (name) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.inScreenLoader = true;
            this.history_music_Result = [];
            this.history_music_values = [];
            this.btnColor_pre = '#002b3d';
            this.colors_pre = '#ffffff';
            this.btnColor_next = '#fccb2b';
            this.colors_next = '#002b3d';
            this.service.history_paticular_dates(name, this.start_date)
                .subscribe(function (res) {
                _this.start_end_dates = res;
                if (_this.start_end_dates != null) {
                    _this.start_date = _this.start_end_dates.start_date;
                    _this.end_date = _this.start_end_dates.end_date;
                    if (localStorage.getItem('endTmpDate') == _this.end_date) {
                        _this.btnColor_next = '#002b3d';
                        _this.colors_next = '#ffffff';
                    }
                    _this.dates_id = _this.start_end_dates.id;
                    _this.service.history_music_details_limit(_this.dates_id, _this.genre_id, _this.count_list)
                        .subscribe(function (res) {
                        _this.history_music_values = res;
                        _this.inScreenLoader = false;
                        if (Object.keys(_this.history_music_values).length == 0) {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                        else {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.inScreenLoader = false;
                    });
                }
            }, function (error) {
                console.log(error);
                _this.inScreenLoader = false;
            });
        }
        else {
            this.network_status = 1;
            this.history_music_Result = [];
            this.history_music_values = [];
        }
    };
    HistoryPage.prototype.type = function (slider, i) {
        this.types_first = slider;
        if (i != undefined || i != null) {
            this.slider._activeIndex = i;
        }
        this.history_music_values = [];
        this.current_type = slider.genre_type;
        this.current_type_id = slider.id;
        this.selectedSegment = slider.genre_type;
        this.count_list = 10;
        this.genre_id = slider.id;
        this.toplist();
    };
    HistoryPage.prototype.toplist = function () {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            this.inScreenLoader = true;
            this.service.history_music_details_limit(this.dates_id, this.genre_id, this.count_list)
                .subscribe(function (res) {
                _this.inScreenLoader = false;
                _this.history_music_values = res;
                if (Object.keys(_this.history_music_values).length == 0) {
                    _this.history_music_Result = Object.keys(_this.history_music_values).length;
                }
                else {
                    _this.history_music_Result = Object.keys(_this.history_music_values).length;
                }
                if (localStorage.getItem("noti_genre_type") != undefined) {
                    if (_this.global.modalActive == true) {
                        _this.modalPage.dismiss();
                    }
                    var user = localStorage.getItem("ViewDetails");
                    var rank = localStorage.getItem("rank");
                    _this.openModal(user, rank);
                }
            }, function (error) {
                _this.inScreenLoader = false;
                _this.history_music_values = [];
                console.log(error);
            });
        }
        else {
            this.history_music_values = [];
            this.history_music_Result = [];
            this.network_status = 1;
        }
    };
    HistoryPage.prototype.cancelSearch = function (event) {
        this.someValue = "";
        this.toggled = false;
        this.function_switch(1);
    };
    HistoryPage.prototype.toggle = function () {
        this.navCtrl.push('SearchPage');
    };
    HistoryPage.prototype.openModal = function (user, rank) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("which_page", "Historypage");
            localStorage.setItem("rank", rank);
            //localStorage.setItem("Rank",id);
            var data = { message: 'hello world' };
            this.modalPage = this.modalCtrl.create('ModalPage', data);
            this.modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        if (_this.counter == 0) {
                            _this.counter++;
                            _this.presentToast();
                            setTimeout(function () { _this.counter = 0; }, 3000);
                        }
                        else {
                            _this.platform.exitApp();
                        }
                    }, 0);
                    _this.triggerNotification();
                });
                _this.global.modalActive == false;
                _this.service.history_music_details_limit(_this.dates_id, _this.genre_id, _this.count_list).subscribe(function (res) {
                    _this.history_music_values = res;
                    if (Object.keys(_this.history_music_values).length == 0) {
                        _this.history_music_Result = Object.keys(_this.history_music_values).length;
                    }
                    else {
                        _this.history_music_Result = Object.keys(_this.history_music_values).length;
                    }
                }, function (error) {
                    console.log(error);
                });
            });
            this.modalPage.present().then(function () {
                _this.global.modalActive = true;
            });
            ;
        }
        else {
            this.history_music_values = [];
            this.history_music_Result = [];
            this.network_status = 1;
        }
    };
    HistoryPage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    HistoryPage.prototype.CheckNetwork = function () {
        if (this.current_type == null || this.current_type == undefined) {
            this.Network();
        }
        else {
            this.type(this.types_first, this.slider._activeIndex);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mySlider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], HistoryPage.prototype, "slider", void 0);
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/history/history.html"*/'<ion-header>\n  <ion-toolbar color="dark-blue">\n    <span>\n      <button menuToggle ion-button icon-only clear>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </span>\n    <img src="assets/imgs/header-logo.png">\n    <span>\n      <button ion-button icon-only (click)="notification()" clear>\n        <ion-icon name="ios-notifications-outline"></ion-icon>\n        <span class="notify" *ngIf="notify_count!=0" [hidden]="notify_count==undefined">{{notify_count}}</span>\n      </button>      \n    </span>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n <div class="subheader">\n    <h3 id="history_dates">History<span *ngIf="types?.length!=0">{{start_date | date: \'dd-MMM-yyyy\' }} - {{end_date | date: \'dd-MMM-yyyy\'}}</span></h3>\n    <ion-icon id="history_search_button" name="search" (click)="toggle()"></ion-icon>\n  </div>  \n  <div class="button-group" *ngIf="types?.length!=0">\n      <button ion-button color="dark-blue" id="history_previous" (click)="previous(\'previous\')" [ngStyle]="{\'background-color\': btnColor_pre,\'color\': colors_pre}">\n        <ion-icon name="ios-arrow-back" ></ion-icon>\n        Prev\n      </button>\n      <button ion-button color="dark-blue" id="history_next" [disabled]="!isenabled || endtempdate==end_date" (click)="next(\'next\')" [ngStyle]="{\'background-color\': btnColor_next,\'color\': colors_next}">Next\n        <ion-icon name="ios-arrow-forward"></ion-icon>\n      </button>\n  </div>\n\n  \n <ion-toolbar class="segment" *ngIf="types?.length!=0">\n    <ion-segment  [(ngModel)]="selectedSegment"  (ionChange)="onSegmentChanged($event)">   \n        <ion-segment-button *ngFor="let slide of types; let i = index" (click)="type(slide,i)" value="{{slide.genre_type}}">\n              {{slide.genre_type}}\n        </ion-segment-button> \n    </ion-segment> \n  </ion-toolbar>\n   <ion-slides #mySlider (ionSlideDidChange)="onSlideChanged($event)">\n    <ion-slide *ngFor="let slide of types">\n\n        <div class="no_matches" *ngIf="inScreenLoader">\n            <img src="assets/imgs/rotating-ring-loader.gif">\n        </div>\n\n        <div class="slider-container" *ngIf="network_status == 2">\n\n          <div  *ngIf="history_music_Result == 0 && !inScreenLoader" class="no_matches">\n            <img src="assets/imgs/myupload.png">\n            <h5 class="no_data">No records available</h5>\n          </div>\n\n          <div class="user_list" *ngFor="let his of history_music_values; let i = index">\n            <button ion-item (click)="openModal(his.id,his.rank)">\n              <ion-avatar item-start>\n                <img src="assets/imgs/contactIcon.png" *ngIf="his.user.image.length==0 || his.user.image[0].image_path.url==null">\n                <img src="{{his.user.image[0].image_path.url}}" *ngIf="his.user.image.length!=0 && his.user.image[0].image_path.url!=null">\n              </ion-avatar>\n              <h2>{{his.title}}</h2>\n              <p><span><ion-icon name="ios-person-outline"></ion-icon>{{his.user.first_name}}</span><span><ion-icon name="ios-star-outline"></ion-icon>{{his.votes.length}} votes</span><span><ion-icon name="ios-trophy-outline"></ion-icon>Rank {{his.rank}}</span></p>\n            </button>\n          </div>\n\n        </div>\n\n       <div class="no_internet slider-container" *ngIf="network_status == 1 && !inScreenLoader">\n        <img src="assets/imgs/no_internet.png">\n        <h5>Oops!!</h5>\n        <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>        \n        <button ion-button color="light" round item-end icon-start (click)="CheckNetwork()">\n          <ion-icon name="refresh"  ></ion-icon>\n          Try again          \n        </button>         \n      </div>      \n  <div *ngIf="genre_id == slide.id && history_music_values?.length == count_list">    \n\n     <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n       <ion-infinite-scroll-content  loadingSpinner="bubbles"\n      loadingText="Loading more data..."></ion-infinite-scroll-content>\n     </ion-infinite-scroll>\n\n  </div>\n\n  </ion-slide>\n  <div class="no_internet1" *ngIf="network_status == 1 && !inScreenLoader">\n      <img src="assets/imgs/no_internet.png">\n      <h5>Oops!!</h5>\n      <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n      <button ion-button color="light" round item-end icon-start (click)="CheckNetwork()">\n          <ion-icon name="refresh"></ion-icon> Try again\n      </button>\n    </div>\n</ion-slides>\n\n  <div class="no_matches" *ngIf="inScreenLoader && types == undefined || types == null || types == \'\'" style="margin-top: -192px;">\n    <img src="assets/imgs/rotating-ring-loader.gif" style="margin-top: -55px;">\n  </div>    \n      \n</ion-content>\n\n\n\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/history/history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_history_history__["a" /* HistoryProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeSearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the HomeSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var HomeSearchPipe = /** @class */ (function () {
    function HomeSearchPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    HomeSearchPipe.prototype.transform = function (items, filterQuery) {
        if (!filterQuery)
            return items;
        return items.filter(function (item) {
            console.log(item);
            //console.log(item.title.toLowerCase().includes(filterQuery.toLowerCase()))
            return item.title.toLowerCase().includes(filterQuery.toLowerCase());
        });
    };
    HomeSearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'homeSearch',
        })
    ], HomeSearchPipe);
    return HomeSearchPipe;
}());

//# sourceMappingURL=home-search.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 /*AfterViewInit, Renderer*/










var HomePage = /** @class */ (function () {
    function HomePage(app, nav, navCtrl, navParams, platform, alertCtrl, modalCtrl, http, Homeservice, global, loadingCtrl, notify, network, oneSignal, viewCtrl, toast) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.Homeservice = Homeservice;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.network = network;
        this.oneSignal = oneSignal;
        this.viewCtrl = viewCtrl;
        this.toast = toast;
        this.queryhome = 'music';
        this.isAvailable = false;
        this.toggled = false;
        this.setGenre = [];
        this.counter = 0;
        this.inScreenLoader = false;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                if (_this.counter == 0) {
                    _this.counter++;
                    _this.presentToast();
                    setTimeout(function () { _this.counter = 0; }, 3000);
                }
                else {
                    platform.exitApp();
                }
            }, 0);
            _this.triggerNotification();
        });
        this.count_list = 10;
        localStorage.removeItem("ProfileShow");
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.Network(this.current_type);
    };
    HomePage.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '3000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.global.current_page = "HomePage";
        this.ud_id = localStorage.getItem("storeID");
        if (this.ud_id != null) {
            this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                _this.notify_count = res._body;
            }, function (error) {
                console.log(error);
            });
        }
    };
    HomePage.prototype.ionViewDidEnter = function () { };
    HomePage.prototype.triggerNotification = function () {
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
            if (localStorage.getItem("action") == 'false') {
                localStorage.setItem("noti_page", _this.getPushData.action);
                if (_this.getPushData.value != undefined || _this.getPushData.value != null) {
                    localStorage.setItem("ViewDetails", _this.getPushData.value.id);
                    localStorage.setItem("noti_genre_id", _this.getPushData.value.genre.id);
                    localStorage.setItem("noti_genre_type", _this.getPushData.value.genre.genre_type);
                    if (localStorage.getItem("noti_page") == "home") {
                        _this.getSlide = { "genre_type": _this.getPushData.value.genre.genre_type, "id": _this.getPushData.value.id };
                        _this.genreClick(_this.getSlide);
                    }
                    else {
                        //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                        //this.nav.getActiveChildNav().select(3);
                        _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                    }
                }
                else if (localStorage.getItem("noti_page") == "history") {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                    //this.nav.getActiveChildNav().select(3);
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
                else {
                }
            }
            else {
                localStorage.setItem("noti_page", _this.getPushData.action);
                if (_this.getPushData.value != undefined || _this.getPushData.value != null) {
                    localStorage.setItem("ViewDetails", _this.getPushData.value.id);
                    localStorage.setItem("noti_genre_id", _this.getPushData.value.genre.id);
                    localStorage.setItem("noti_genre_type", _this.getPushData.value.genre.genre_type);
                    if (localStorage.getItem("noti_page") == "home") {
                        _this.getSlide = { "genre_type": _this.getPushData.value.genre.genre_type, "id": _this.getPushData.value.id };
                        _this.genreClick(_this.getSlide);
                    }
                    else {
                        //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                        //this.navCtrl.parent.select(3);
                        //this.nav.getActiveChildNav().select(3);
                        _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                    }
                }
                else if (localStorage.getItem("noti_page") == "history") {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
                    //this.navCtrl.parent.select(3);
                    //this.nav.getActiveChildNav().select(3);
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
                else {
                }
            }
        });
        this.oneSignal.endInit();
    };
    HomePage.prototype.onSegmentChanged = function (segmentButton) {
        var selectedIndex = this.types.findIndex(function (slide) {
            return slide.genre_type === segmentButton.value;
        });
        this.slider.slideTo(selectedIndex);
    };
    HomePage.prototype.onSlideChanged = function (slider) {
        if (this.types.length > slider._activeIndex) {
            var currentSlide = this.types[slider._activeIndex];
            this.setGenre = [];
            this.genreClick(currentSlide);
        }
    };
    HomePage.prototype.Network = function (status) {
        var _this = this;
        if (localStorage.getItem("noti_genre_type") != undefined) {
            this.current_type = localStorage.getItem("noti_genre_type");
            this.getSlide = { "genre_type": localStorage.getItem("noti_genre_type"), "id": localStorage.getItem("noti_genre_id") };
            this.inScreenLoader = true;
            this.Homeservice.home_type_first()
                .subscribe(function (res) {
                _this.network_status = 2;
                _this.global.network_status = 2;
                _this.types_first = res;
                _this.Homeservice.home_type()
                    .subscribe(function (res) {
                    _this.types = res;
                    for (var i = 0; i < Object.keys(_this.types).length; i++) {
                        if (_this.types[i].genre_type == _this.getSlide.genre_type) {
                            _this.genreClick(_this.getSlide);
                        }
                    }
                }, function (error) {
                    _this.inScreenLoader = false;
                    console.log(error);
                });
            }, function (error) {
                _this.inScreenLoader = false;
                _this.types = [];
                _this.network_status = 1;
                _this.global.network_status = 1;
                console.log(error);
            });
        }
        else if (this.types_first == undefined || this.types_first == null) {
            this.inScreenLoader = true;
            this.Homeservice.home_type_first()
                .subscribe(function (res) {
                _this.network_status = 2;
                _this.global.network_status = 2;
                _this.types_first = res;
                _this.Homeservice.home_type()
                    .subscribe(function (res) {
                    _this.types = res;
                    for (var i = 0; i < Object.keys(_this.types).length; i++) {
                        if (_this.types[i].genre_type == _this.types_first.genre_type) {
                            _this.genreClick(_this.types_first);
                        }
                    }
                }, function (error) {
                    _this.inScreenLoader = false;
                    console.log(error);
                });
            }, function (error) {
                _this.inScreenLoader = false;
                _this.types = [];
                _this.network_status = 1;
                _this.global.network_status = 1;
                console.log(error);
            });
        }
        else if (this.types == undefined || this.types == null) {
            this.inScreenLoader = true;
            this.Homeservice.home_type()
                .subscribe(function (res) {
                _this.network_status = 2;
                _this.global.network_status = 2;
                _this.types = res;
                for (var i = 0; i < Object.keys(_this.types).length; i++) {
                    if (_this.types[i].genre_type == _this.types_first.genre_type) {
                        _this.genreClick(_this.types_first);
                    }
                }
            }, function (error) {
                _this.inScreenLoader = false;
                _this.types = [];
                _this.network_status = 1;
                _this.global.network_status = 1;
                console.log(error);
            });
        }
        else {
            this.genreClick(this.types_first);
        }
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.global.network_status == 2) {
                _this.network_status = 2;
                _this.count_list = _this.count_list + 10;
                _this.Homeservice.homeGenre_limit(_this.ID, _this.count_list)
                    .subscribe(function (res) {
                    _this.setGenre = res;
                    infiniteScroll.complete();
                }, function (error) {
                    console.log(error);
                });
            }
            else {
                infiniteScroll.complete();
            }
        }, 500);
    };
    HomePage.prototype.openModal = function (user, rank) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("which_page", "Homepage");
            localStorage.setItem("rank", rank);
            var data = { message: 'hello world' };
            this.modalPage = this.modalCtrl.create('ModalPage', data);
            this.modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        if (_this.counter == 0) {
                            _this.counter++;
                            _this.presentToast();
                            setTimeout(function () { _this.counter = 0; }, 3000);
                        }
                        else {
                            _this.platform.exitApp();
                        }
                    }, 0);
                    _this.triggerNotification();
                });
                _this.global.modalActive = false;
                _this.Homeservice.homeGenre_limit(_this.ID, _this.count_list)
                    .subscribe(function (res) {
                    _this.setGenre = res;
                    if (localStorage.getItem("noti_genre_type") != undefined) {
                        var user_1 = localStorage.getItem("ViewDetails");
                        _this.openModal(user_1, rank);
                    }
                }, function (error) {
                    console.log(error);
                });
            });
            this.modalPage.present().then(function () {
                _this.global.modalActive = true;
            });
            ;
        }
        else {
            this.setGenre = [];
            this.network_status = 1;
        }
    };
    HomePage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    HomePage.prototype.cancelSearch = function (event) {
        this.someValue = "";
        this.toggled = false;
        this.getGenre();
    };
    HomePage.prototype.toggle = function () {
        this.navCtrl.push('SearchPage');
    };
    HomePage.prototype.getGenre = function () {
        var _this = this;
        this.inScreenLoader = true;
        this.Homeservice.homeGenre_limit(this.ID, this.count_list)
            .subscribe(function (res) {
            _this.inScreenLoader = false;
            _this.setGenre = res;
            _this.network_status = 2;
            _this.global.network_status = 2;
            if (localStorage.getItem("noti_genre_type") != undefined) {
                if (_this.global.modalActive == true) {
                    _this.modalPage.dismiss();
                }
                var user = localStorage.getItem("ViewDetails");
                var rank = localStorage.getItem("rank");
                _this.openModal(user, rank);
            }
        }, function (error) {
            _this.setGenre = [];
            _this.network_status = 1;
            _this.global.network_status = 1;
            _this.inScreenLoader = false;
            console.log(error);
        });
    };
    HomePage.prototype.genreClick = function (slider, i) {
        this.types_first = slider;
        if (i != undefined || i != null) {
            this.slider._activeIndex = i;
        }
        this.setGenre = [];
        this.current_type = slider.genre_type;
        this.selectedSegment = slider.genre_type;
        this.count_list = 10;
        this.ID = slider.id;
        this.getGenre();
    };
    HomePage.prototype.searchHome = function () {
        var _this = this;
        if (this.someValue != undefined) {
            this.toggled = false;
            this.Homeservice.homeSearch(this.ID, this.someValue)
                .subscribe(function (res) {
                _this.someValue = "";
                _this.setGenre = res;
            }, function (error) {
                console.log(error);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myContent'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "myContent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mySlider'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], HomePage.prototype, "slider", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/home/home.html"*/'<ion-header> \n  <ion-toolbar color="dark-blue">\n    <span>\n      <button menuToggle ion-button icon-only clear>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </span>\n    <img src="assets/imgs/header-logo.png">\n    <span>\n      <button ion-button icon-only (click)="notification()" clear>\n        <ion-icon name="ios-notifications-outline"></ion-icon>\n         <span class="notify" *ngIf="notify_count!=0" [hidden]="notify_count==undefined">{{notify_count}}</span>\n      </button>     \n    </span>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n    <div class="subheader">\n      <h3>Current Standings</h3>\n      <ion-icon name="search" (click)="toggle()"></ion-icon>\n    </div> \n    <ion-toolbar class="segment" *ngIf="types?.length!=0">\n      <ion-segment  [(ngModel)]="selectedSegment"  (ionChange)="onSegmentChanged($event)">   \n          <ion-segment-button *ngFor="let slide of types; let i = index" (click)="genreClick(slide,i)" value="{{slide.genre_type}}">\n            {{slide.genre_type}}\n          </ion-segment-button> \n      </ion-segment>\n    </ion-toolbar>\n   <!--  <div #panel style="overflow-y:scroll; height: 20px;" >\n      <div *ngFor="let log of arr; let i = index" innerHTML="{{log}}" [id]="i"></div>\n    </div>\n    <button (click)="onPreviousSearchPosition()">Previous</button>\n    <button (click)="onNextSearchPosition()">Next</button> -->\n    <div class="no_matches" *ngIf="inScreenLoader && types?.length==0 || inScreenLoader && types?.length==undefined">\n      <img src="assets/imgs/rotating-ring-loader.gif">\n    </div> \n  <ion-slides #mySlider (ionSlideDidChange)="onSlideChanged($event)">\n    <ion-slide  *ngFor="let slide of types">\n        \n        <div class="no_matches" *ngIf="inScreenLoader">\n            <img src="assets/imgs/rotating-ring-loader.gif">\n        </div>\n\n        <div class="slider-container" *ngIf="network_status == 2">\n            <div class="user_list" *ngFor="let user of setGenre; let i = index">\n              <button ion-item (click)="openModal(user.id,user.rank)">\n                  <ion-avatar item-start>\n                  <img src="assets/imgs/contactIcon.png" *ngIf="user.user.image.length==0 || user.user.image[0].image_path.url==null">\n                  <img src="{{user.user.image[0].image_path.url}}" *ngIf="user.user.image.length!=0 && user.user.image[0].image_path.url!=null">\n                  </ion-avatar>\n                  <h2>{{user.title }}</h2>\n                  <p><span><ion-icon name="ios-person-outline"></ion-icon>{{user.user.first_name}}</span><span><ion-icon name="ios-star-outline"></ion-icon>{{user.votes.length}} votes</span><span><ion-icon name="ios-trophy-outline"></ion-icon>Rank {{user.rank}}</span></p>\n              </button>\n              <button ion-button icon-only clear class="btn-action" (click)="openModal(user.id,user.rank)">\n                  <ion-icon name="ios-arrow-forward"></ion-icon>\n              </button>\n            </div>\n            <div class="no_matches" *ngIf="(setGenre).length==0 && network_status == 2 && !inScreenLoader">\n              <img src="assets/imgs/myupload.png">\n              <h5>No Records Found</h5>\n            </div>\n        </div>\n        <div class="no_internet slider-container" *ngIf="network_status == 1 && !inScreenLoader">\n            <img src="assets/imgs/no_internet.png">\n            <h5>Oops!!</h5>\n            <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n            <button ion-button color="light" round item-end icon-start (click)="Network()">\n                <ion-icon name="refresh"></ion-icon> Try again\n            </button>\n        </div>        \n        \n        \n     <div *ngIf="ID == slide.id && setGenre.length == count_list"> \n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content  loadingSpinner="bubbles" loadingText="Loading more data...">  \n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n     </div> \n\n    </ion-slide>\n    <div class="no_internet1" *ngIf="network_status == 1 && types?.length == 0 && setGenre.length == 0 && !inScreenLoader">\n            <img src="assets/imgs/no_internet.png">\n            <h5>Oops!!</h5>\n            <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n            <button ion-button color="light" round item-end icon-start (click)="Network(\'Music\')">\n                <ion-icon name="refresh"></ion-icon> Try again\n            </button>\n    </div> \n  </ion-slides>\n</ion-content>\n\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__providers_home_home__["a" /* HomeProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__["a" /* Toast */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyvotesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_myvotes_myvotes__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyvotesPage = /** @class */ (function () {
    function MyvotesPage(app, nav, navCtrl, navParams, platform, alertCtrl, socialSharing, modalCtrl, votes, global, loadingCtrl, notify, network, oneSignal, toast) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.modalCtrl = modalCtrl;
        this.votes = votes;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.network = network;
        this.oneSignal = oneSignal;
        this.toast = toast;
        this.queryhistory = 'music';
        this.votesdetails = [];
        this.counter = 0;
        this.inScreenLoader = false;
        this.checkFirst = true;
        this.showLoadMore = false;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.someValue = "";
                if (_this.global.toggled == false) {
                    if (_this.counter == 0) {
                        _this.counter++;
                        _this.presentToast();
                        setTimeout(function () { _this.counter = 0; }, 3000);
                    }
                    else {
                        platform.exitApp();
                    }
                }
                else {
                    _this.global.toggled = false;
                    _this.myvotesget();
                }
            }, 0);
            _this.triggerNotification();
        });
        this.count_list = 10;
        if (localStorage.getItem("user_id") != null) {
            this.user_id = localStorage.getItem("user_id");
        }
        else {
            this.user_id = null;
        }
        if (localStorage.getItem("storeID") != null) {
            this.storeID = localStorage.getItem("storeID");
        }
        else {
            this.storeID = null;
        }
    }
    MyvotesPage.prototype.ionViewDidLoad = function () {
        this.myvotesget();
    };
    MyvotesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.votesdetails = [];
        if (this.checkFirst == false) {
            this.myvotesget();
        }
        this.global.toggled = false;
        this.someValue = "";
        this.global.current_page = "MyvotesPage";
        this.ud_id = localStorage.getItem("storeID");
        if (this.ud_id != null) {
            this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                _this.notify_count = res._body;
            }, function (error) {
                console.log(error);
            });
        }
        this.checkFirst = false;
    };
    MyvotesPage.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '2000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    MyvotesPage.prototype.triggerNotification = function () {
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
                    //this.nav.getActiveChildNav().select(0);
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                    //this.nav.getActiveChildNav().select(3);
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
            else if (localStorage.getItem("noti_page") == "home") {
                //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0}) 
                //this.nav.getActiveChildNav().select(0);
                _this.nav.setRoot('TabsPage', { tabIndex: 0 });
            }
            else {
                //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
                //this.nav.getActiveChildNav().select(3);
                _this.nav.setRoot('TabsPage', { tabIndex: 3 });
            }
            /*}*/
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    MyvotesPage.prototype.compilemsg = function (index) {
        var msg = "Hi i am Crooner";
        return msg.concat(" \n Sent from Croon App !");
    };
    MyvotesPage.prototype.regularShare = function (id) {
        this.socialSharing.share(this.global.shareUrl + 'genres/croon_share?id=' + id);
    };
    MyvotesPage.prototype.cancelSearch = function (event) {
        this.someValue = "";
        this.global.toggled = false;
        //this.myvotesget();
    };
    MyvotesPage.prototype.toggle = function () {
        var _this = this;
        this.global.toggled = this.global.toggled ? false : true;
        setTimeout(function () {
            _this.myInput.setFocus();
        }, 150);
    };
    MyvotesPage.prototype.goto_login = function () {
        this.navCtrl.setRoot('LoginPage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    MyvotesPage.prototype.openModal = function (user, rank) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("rank", rank);
            var data = { message: 'hello world' };
            var modalPage = this.modalCtrl.create('ModalPage', data);
            modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        _this.someValue = "";
                        if (_this.global.toggled == false) {
                            if (_this.counter == 0) {
                                _this.counter++;
                                _this.presentToast();
                                setTimeout(function () { _this.counter = 0; }, 3000);
                            }
                            else {
                                _this.platform.exitApp();
                            }
                        }
                        else {
                            _this.global.toggled = false;
                            _this.myvotesget();
                        }
                    }, 0);
                    _this.triggerNotification();
                });
            });
            modalPage.present();
        }
        else {
            this.network_status = 1;
            this.votesdetails = [];
        }
    };
    MyvotesPage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    MyvotesPage.prototype.myvotesget = function () {
        var _this = this;
        if (this.global.network_status == 2) {
            this.votesdetails = [];
            this.network_status = 2;
            this.inScreenLoader = true;
            if (this.user_id != null) {
                this.user = this.user_id;
            }
            else if (this.storeID != null) {
                this.user = this.storeID;
            }
            this.votes.votedisp(this.user) //uploaddisp ,this.count_list
                .subscribe(function (res) {
                _this.inScreenLoader = false;
                _this.votesdetails = res;
                if (_this.votesdetails.length == _this.count_list) {
                    _this.showLoadMore = true;
                }
                else {
                    _this.showLoadMore = false;
                }
            }, function (error) {
                _this.inScreenLoader = false;
                console.log(error);
            });
        }
        else {
            this.votesdetails = [];
            this.network_status = 1;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('input'),
        __metadata("design:type", Object)
    ], MyvotesPage.prototype, "myInput", void 0);
    MyvotesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myvotes',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/myvotes/myvotes.html"*/'<ion-header>\n  <ion-toolbar color="dark-blue">\n    <span>\n      <button menuToggle ion-button icon-only clear>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </span>\n    <img src="assets/imgs/header-logo.png">\n    <span>\n      <button ion-button icon-only  (click)="notification()" clear>\n        <ion-icon name="ios-notifications-outline"></ion-icon>\n        <span class="notify" *ngIf="notify_count!=0" [hidden]="notify_count==undefined">{{notify_count}}</span>\n      </button>     \n    </span>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n      \n          <div class="subheader" *ngIf="user_id==null && storeID==null" style="border-bottom: 1px solid #ddd;">\n            <h3>My Votes</h3>\n          </div>\n\n          <div *ngIf="network_status == 2">\n\n          <div class="subheader" *ngIf="user_id!=null || storeID!=null">\n            <h3 *ngIf="!global.toggled">My Votes</h3>\n            <ion-icon id="myvotes_search_button" name="search" *ngIf="!global.toggled" (click)="toggle()"></ion-icon>\n          </div>\n       <!--  \n        <ion-searchbar id="myvotes_search"\n           *ngIf="global.toggled"\n           [(ngModel)]="someValue"\n           (ionCancel)="cancelSearch($event)"\n           (ionInput)="onInput($event)"\n           [showCancelButton]="true" #input>\n        </ion-searchbar> -->\n        \n        <ion-searchbar id="myvotes_search"\n           *ngIf="global.toggled"\n           [(ngModel)]="someValue"\n           (ionCancel)="cancelSearch($event)"\n           [showCancelButton]="true" #input>\n        </ion-searchbar>  \n\n        <ion-list class="user_list" id="myvotes_details">\n          <div class="user_list" *ngFor="let user of votesdetails | homeSearch:someValue;let i = index">\n            <button ion-item (click)="openModal(user.id,user.rank)">\n              <ion-avatar item-start>\n                <img src="assets/imgs/contactIcon.png" *ngIf="user.user.image.length==0 || user.user.image[0].image_path.url==null">\n                <img src="{{user.user.image[0].image_path.url}}" *ngIf="user.user.image.length!=0 && user.user.image[0].image_path.url!=null">\n              </ion-avatar>\n              <h2>{{user.title}}</h2>\n              <p><span><ion-icon name="ios-person-outline"></ion-icon>{{user.user.first_name}}</span><span><ion-icon name="ios-star-outline"></ion-icon>{{user.votes.length}} votes</span><span><ion-icon name="ios-trophy-outline"></ion-icon>Rank {{user.rank}}</span></p>\n            </button>\n            <button ion-button icon-only clear class="btn-action" id="myvotes_share_button" (click)="regularShare(user.id)">\n              <ion-icon name="md-share"></ion-icon>\n            </button>\n          </div>\n          \n          <div class="no_matches" *ngIf="(votesdetails | homeSearch:someValue).length==0 && (votesdetails).length!=0 && !inScreenLoader">\n            <img src="assets/imgs/myupload.png">\n            <h5 class="no_data">No Search results found</h5>\n          </div> \n\n\n          <div  class="no_matches" *ngIf="(votesdetails).length==0 && user_id!=null && network_status == 2 && !inScreenLoader && (votesdetails | homeSearch:someValue).length==0 || (votesdetails).length==0 && storeID!=null && network_status == 2 && !inScreenLoader && (votesdetails | homeSearch:someValue).length==0">\n            <img src="assets/imgs/myupload.png">\n            <h5 class="no_data">No Records found</h5>\n          </div>\n        </ion-list>\n\n          <div class="no_matches" *ngIf="user_id==null && storeID==null && network_status == 2 && !inScreenLoader">\n            <img src="assets/imgs/vote.png">\n            <h5>Vote Your Favourite</h5>\n            <p>Make count for your favourite</p>\n          </div>\n\n          <div class="no_matches" *ngIf="inScreenLoader">\n            <img src="assets/imgs/rotating-ring-loader.gif">\n          </div>\n      </div>\n      <div class="no_internet" *ngIf="network_status == 1 && !inScreenLoader">\n        <img src="assets/imgs/no_internet.png">\n        <h5>Oops!!</h5>\n        <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n        <button ion-button color="light" round item-end icon-start (click)="myvotesget()">\n          <ion-icon name="refresh"></ion-icon>\n          Try again\n        </button>\n      </div>\n\n     <!--  <div *ngIf="showLoadMore"> \n         <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content  loadingSpinner="bubbles"\n                loadingText="Loading more data..."></ion-infinite-scroll-content>\n         </ion-infinite-scroll>\n      </div>  -->\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/myvotes/myvotes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_myvotes_myvotes__["a" /* VotesProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__["a" /* Toast */]])
    ], MyvotesPage);
    return MyvotesPage;
}());

//# sourceMappingURL=myvotes.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_notification_notification__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(9);
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
                this.notify.notificationList_limit(this.ud_id, this.count_list).subscribe(function (res) {
                    _this.inScreenLoader = false;
                    _this.network_status = 2;
                    _this.all_notify = res;
                    if (_this.all_notify.length == _this.count_list) {
                        _this.notify_infinite_count = 1;
                    }
                    else {
                        _this.notify_infinite_count = 2;
                    }
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
            /*}*/
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    NotificationPage.prototype.openModal = function (user, rank) {
        var _this = this;
        if (this.global.network_status == 2) {
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("rank", rank);
            var modalPage = this.modalCtrl.create('ModalPage');
            modalPage.onDidDismiss(function () {
                _this.ud_id = localStorage.getItem("storeID");
                if (_this.ud_id != null) {
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
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        _this.navCtrl.pop();
                    }, 0);
                    _this.triggerNotification();
                });
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
            }, function (error) {
                console.log(error);
            });
            this.ud_id = localStorage.getItem("storeID");
            if (this.ud_id != null) {
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
                _this.ud_id = localStorage.getItem("storeID");
                if (_this.ud_id != null) {
                    _this.notify.notificationList_limit(_this.ud_id, _this.count_list).subscribe(function (res) {
                        _this.all_notify = res;
                        if (_this.all_notify.length == _this.count_list) {
                            _this.notify_infinite_count = 1;
                        }
                        else {
                            _this.notify_infinite_count = 2;
                        }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notification',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/notification/notification.html"*/'<style type="text/css">\n  .noti{\n    color: rgb(70, 2, 2);\n    font-weight: 900;\n  }\n  .notu-sub{\n    color: #000;\n  }\n</style>\n\n<ion-header>\n  <ion-navbar color="dark-blue">\n      <ion-title>Notification</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n<ion-list>\n\n    <div *ngIf="network_status == 2">\n\n     <ion-item-sliding *ngFor="let notify of all_notify">\n\n      <ion-item (click)="openModal(notify[0].upload_id,notify[2]);notify_status(notify[0].id)">\n        <ion-avatar item-start>\n          <img src="assets/imgs/contactIcon.png" *ngIf="notify[0].user.image.length==0">\n          <img src="{{notify[0].user.image[0].image_path.url}}" *ngIf="notify[0].user.image.length!=0">\n        </ion-avatar>\n        <h2 [ngClass]="{\'noti\':notify[0].view_status==null}">{{notify[0].upload.title}}</h2>\n        <p [ngClass]="{\'noti-sub\':notify[0].view_status==null}">{{notify[0].message}}</p>\n        <ion-note item-end>{{notify[0].created_at | date:\'shortTime\'}}</ion-note>\n      </ion-item>\n\n      <ion-item-options side="right">\n        <button ion-button color="danger" (click)="notify_delete(notify[0].id)">\n          <ion-icon name="md-trash"></ion-icon>\n            Delete\n        </button>\n      </ion-item-options>\n     </ion-item-sliding>\n\n      <div *ngIf="notify_infinite_count == 1"> \n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n          <ion-infinite-scroll-content  loadingSpinner="bubbles" loadingText="Loading more data...">     \n          </ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n      </div>\n    </div>\n\n  <div class="no_matches" *ngIf="inScreenLoader">\n    <img src="assets/imgs/rotating-ring-loader.gif">\n  </div>\n\n  <div class="no_matches" *ngIf="noti_count==0 && network_status == 2 && !inScreenLoader">\n    <img src="assets/imgs/myupload.png">\n    <h5>No Notifications Found</h5>\n  </div>\n\n  <div class="no_internet1" *ngIf="network_status == 1">\n            <img src="assets/imgs/no_internet.png">\n            <h5>Oops!!</h5>\n            <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n            <button ion-button color="light" round item-end icon-start (click)="Network(\'Music\')">\n                <ion-icon name="refresh"></ion-icon> Try again\n            </button>\n  </div> \n\n</ion-list>\n  \n</ion-content>\n\n\n\n\n<!-- <ion-header>\n  <ion-navbar color="dark-blue">\n      <ion-title>Notification</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-list-header>Today</ion-list-header>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/images.jpg">\n      </ion-avatar>\n      <h2>Your Upload</h2>\n      <p>SNS NEW - 180 votes - 3 Rank</p>\n      <ion-note item-end>Now</ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/images(2).jpg">\n      </ion-avatar>\n      <h2>The title you vote for</h2>\n      <p>XNEW AUDIO   200-Votes -2 Rank</p>\n      <ion-note item-end>1:12 pm</ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/images(3).jpg">\n      </ion-avatar>\n      <h2>Raj Commented for your music</h2>\n      <p>New Dance</p>\n      <ion-note item-end>10:03 am</ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/images(5).jpg">\n      </ion-avatar>\n      <h2>Vicky Uploaded New Video</h2>\n      <p>ABC VIDEO</p>\n      <ion-note item-end>5:47 am</ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/tennis.jpg">\n      </ion-avatar>\n      <h2>Your BEST CATCH received</h2>\n      <p>Sports - 274 Votes -1 Rank</p>\n      <ion-note item-end>3:07 am</ion-note>\n    </ion-item>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="assets/imgs/poombavai.jpg">\n      </ion-avatar>\n      <h2>Voting will close at 27-05-2018</h2>\n      <p>soon</p>\n      <ion-note item-end>12:10 am</ion-note>\n    </ion-item>\n  </ion-list>\n</ion-content> -->\n\n\n\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/notification/notification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */]])
    ], NotificationPage);
    return NotificationPage;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_media_capture__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_myvotes_myvotes__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_upload_upload__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_home_home__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_notification_notification__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_onesignal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_video_editor__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__menu_menu__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_streaming_media__ = __webpack_require__(189);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












//import { IOSFilePicker } from '@ionic-native/file-picker';








//import { Storage } from '@ionic/storage';
//const MEDIA_FILES_KEY = 'mediaFiles';
var UploadPage = /** @class */ (function () {
    function UploadPage(app, nav, navCtrl, navParams, platform, alertCtrl, socialSharing, mediaCapture, media, fileChooser, modalCtrl, upload, global, toastCtrl, loadingCtrl, file, filePath, transfer, toast, uploadService, homeService, notify, oneSignal, videoEditor, _zone, menu, streamingMedia) {
        var _this = this;
        this.app = app;
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.mediaCapture = mediaCapture;
        this.media = media;
        this.fileChooser = fileChooser;
        this.modalCtrl = modalCtrl;
        this.upload = upload;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.file = file;
        this.filePath = filePath;
        this.transfer = transfer;
        this.toast = toast;
        this.uploadService = uploadService;
        this.homeService = homeService;
        this.notify = notify;
        this.oneSignal = oneSignal;
        this.videoEditor = videoEditor;
        this._zone = _zone;
        this.menu = menu;
        this.streamingMedia = streamingMedia;
        this.uploaddeatils = [];
        this.isAvailable = false;
        this.mediaFiles = [];
        this.progress = 0;
        this.counter = 0;
        this.progressbar = false;
        this.videotag = false;
        this.audiotag = false;
        this.inScreenLoader = false;
        this.uploadCount = 0;
        this.showLoadMore = false;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.someValue = "";
                if (_this.global.toggled == false) {
                    if (_this.counter == 0) {
                        _this.counter++;
                        _this.presentToast();
                        setTimeout(function () { _this.counter = 0; }, 3000);
                    }
                    else {
                        platform.exitApp();
                    }
                }
                else {
                    _this.global.toggled = false;
                    _this.uploadget();
                }
            }, 0);
            _this.triggerNotification();
        });
        this.count_list = 10;
        if (localStorage.getItem("user_id") != null) {
            this.user_id = localStorage.getItem("user_id");
        }
        else {
            this.user_id = null;
        }
        if (localStorage.getItem("storeID") != null) {
            this.storeID = localStorage.getItem("storeID");
        }
        else {
            this.storeID = null;
        }
    }
    UploadPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UploadPage');
        this.user_id = localStorage.getItem("user_id");
        //this.video = this.myVideo.nativeElement;
    };
    UploadPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        //console.log(this.uploaddeatils.length)
        this.uploadlength();
        if (localStorage.getItem("uploadcount") != undefined) {
            this.uploadCount = localStorage.getItem("uploadcount");
        }
        if (localStorage.getItem("uploadpage") == "myupload") {
            this.queryupload = 'myupload';
            if (this.uploaddeatils.length == 0) {
                this.uploadget();
            }
        }
        else if (localStorage.getItem("uploadpage") == null) {
            this.queryupload = 'new';
            //this.getlanguages();
            this.getGenre();
            if (this.uploaddeatils.length == 0) {
                this.uploadget();
            }
        }
        else {
            this.queryupload = 'new';
            //this.getlanguages();
            if (this.uploaddeatils.length == 0) {
                this.uploadget();
            }
            this.getGenre();
        }
        this.global.toggled = false;
        this.global.current_page = "UploadPage";
        this.ud_id = localStorage.getItem("storeID");
        if (this.ud_id != null) {
            this.notify.notificationCount(this.ud_id).subscribe(function (res) {
                _this.notify_count = res._body;
            }, function (error) {
                console.log(error);
            });
        }
    };
    UploadPage.prototype.triggerNotification = function () {
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
                    //this.nav.getActiveChildNav().select(0);
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3})
                    //this.nav.getActiveChildNav().select(3);
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
            else if (localStorage.getItem("noti_page") == "home") {
                //this.app.getRootNav().setRoot('TabsPage',{tabIndex:0}) 
                //this.nav.getActiveChildNav().select(0);
                _this.nav.setRoot('TabsPage', { tabIndex: 0 });
            }
            else {
                //this.app.getRootNav().setRoot('TabsPage',{tabIndex:3}) 
                //this.nav.getActiveChildNav().select(3);
                _this.nav.setRoot('TabsPage', { tabIndex: 3 });
            }
            /*}*/
        });
        this.oneSignal.endInit();
        //this.oneSignal.setLogLevel({logLevel: 6, visualLevel: 6});
    };
    UploadPage.prototype.uploadlength = function () {
        var _this = this;
        if (this.user_id != null) {
            this.user = this.user_id;
        }
        else if (this.storeID != null) {
            this.user = this.storeID;
        }
        this.upload.uploaddisp(this.user) //
            .subscribe(function (res) {
            _this.uploadCount = res.length;
            localStorage.setItem("uploadcount", _this.uploadCount);
        }, function (error) {
            console.log(error);
        });
    };
    UploadPage.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '3000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    UploadPage.prototype.goto_login = function () {
        this.navCtrl.push('LoginPage');
        var elements = document.querySelectorAll(".tabbar");
        if (elements != null) {
            Object.keys(elements).map(function (key) {
                elements[key].style.display = 'none';
            });
        }
    };
    UploadPage.prototype.notification = function () {
        this.navCtrl.push('NotificationPage');
    };
    UploadPage.prototype.openModal = function (user, current_status, rank) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("which_page", "Uploadpage");
            localStorage.setItem("current_status_id", current_status.competition_transaction_id);
            localStorage.setItem("rank", rank);
            var data = { message: 'hello world' };
            var modalPage = this.modalCtrl.create('ModalPage', data);
            modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        _this.someValue = "";
                        if (_this.global.toggled == false) {
                            if (_this.counter == 0) {
                                _this.counter++;
                                _this.presentToast();
                                setTimeout(function () { _this.counter = 0; }, 3000);
                            }
                            else {
                                _this.platform.exitApp();
                            }
                        }
                        else {
                            _this.global.toggled = false;
                            _this.uploadget();
                        }
                    }, 0);
                    _this.triggerNotification();
                });
                _this.upload.uploaddisp(_this.user) //,this.count_list
                    .subscribe(function (res) {
                    _this.uploaddeatils = res;
                }, function (error) {
                    console.log(error);
                });
            });
            modalPage.present();
        }
        else {
            this.network_status = 1;
            this.uploaddeatils = [];
        }
    };
    UploadPage.prototype.new_to_myupload = function (e) {
        if (e.direction == 2) {
            this.uploaddeatils = [];
            //this.count_list=10;
            this.queryupload = 'myupload';
            if (this.uploaddeatils.length == 0) {
                this.uploadget();
            }
        }
    };
    UploadPage.prototype.myupload_to_new = function (e) {
        if (e.direction == 4) {
            this.queryupload = 'new';
            this.global.toggled = false;
            this.someValue = "";
            //this.getlanguages();
            if (this.genres.length == 0) {
                this.getGenre();
            }
        }
    };
    UploadPage.prototype.compilemsg = function (index) {
        //var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
        var msg = "Hi iam  Crooner";
        return msg.concat(" \n Sent from Croon App !");
    };
    UploadPage.prototype.regularShare = function (id) {
        //var msg = this.compilemsg(index);
        this.socialSharing.share(this.global.shareUrl + 'genres/croon_share?id=' + id);
    };
    UploadPage.prototype.Audio = function () {
        var _this = this;
        if (this.user_id == null) {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            this.fileName = "";
            this.uploadURI = "";
            this.thumbnail = "";
            this.videotag = false;
            this.audiotag = false;
            var options = { limit: 1, duration: 180 };
            this.mediaCapture.captureAudio(options)
                .then(function (res) {
                var capturedFile = res[0];
                var fileName = capturedFile.name;
                _this.fileName = capturedFile.name;
                //let type = capturedFile.type.split('/');
                _this.file_type = 'audio';
                var dir = capturedFile['localURL'].split('/');
                dir.pop();
                var fromDirectory = dir.join('/');
                var toDirectory = _this.file.dataDirectory;
                var save_file = fromDirectory + '/' + _this.fileName;
                _this.uploadURI = save_file;
                _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function (res) {
                    _this.playPath = toDirectory + _this.fileName;
                    _this.thumbnail = "assets/imgs/music1.jpg";
                    _this.inScreenLoader = true;
                    setTimeout(function () {
                        _this.inScreenLoader = false;
                    }, 5000);
                    //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
                }, function (err) {
                    console.log('err: ', err);
                });
            }, function (err) {
                console.error(err);
                var alertcheck = err.split("{");
                var intent = alertcheck[0];
                if (intent == 'No Activity found to handle Intent ') {
                    var data = { message: 'hello world' };
                    var modal = _this.modalCtrl.create('AudioModalPage', data);
                    modal.present().then(function () {
                    });
                    modal.onDidDismiss(function () {
                        _this.platform.ready().then(function () {
                            _this.platform.registerBackButtonAction(function () {
                                _this.someValue = "";
                                if (_this.global.toggled == false) {
                                    if (_this.counter == 0) {
                                        _this.counter++;
                                        _this.presentToast();
                                        setTimeout(function () { _this.counter = 0; }, 3000);
                                    }
                                    else {
                                        _this.platform.exitApp();
                                    }
                                }
                                else {
                                    _this.global.toggled = false;
                                }
                            }, 0);
                            _this.triggerNotification();
                        });
                        _this.customRecord();
                    });
                }
            });
        }
    };
    UploadPage.prototype.customRecord = function () {
        var _this = this;
        if (localStorage.getItem("audiolist") != undefined) {
            this.uploadURI = localStorage.getItem("audiolist");
            var data = localStorage.getItem("fileNameaudio");
            this.fileName = data.replace(/^"(.*)"$/, '$1');
            this.playPath = this.file.externalDataDirectory + this.fileName;
            var uri = this.playPath;
            //this.filePath.resolveNativePath(uri).then((filePath) => {
            //console.log(filePath)
            this.file.resolveLocalFilesystemUrl(uri).then(function (fileEntry) {
                return new Promise(function (resolve, reject) {
                    fileEntry.file(function (meta) { return resolve(meta); }, function (error) { return reject(error); });
                });
            }).then(function (fileMeta) {
                var type = fileMeta.type.split('/');
                var dir = fileMeta['localURL'];
                _this.uploadURI = dir;
                //this.playPath=this.uploadURI;
            }).catch(function (err) { return console.log(err); });
            //}).catch(err=>console.log(err)); 
            localStorage.removeItem("audiolist");
            localStorage.removeItem("fileNameaudio");
            this.thumbnail = "assets/imgs/music1.jpg";
            this.file_type = 'audio';
            this.inScreenLoader = true;
            setTimeout(function () {
                _this.inScreenLoader = false;
            }, 5000);
        }
    };
    UploadPage.prototype.Video = function () {
        var _this = this;
        if (this.user_id == null) {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            this.fileName = "";
            this.uploadURI = "";
            this.thumbnail = "";
            this.videotag = false;
            this.audiotag = false;
            var filedir = this.file.dataDirectory + 'files/';
            var record_file = 'Movies';
            this.file.writeExistingFile(filedir, record_file, 'folder').then(function (res) {
            }).catch(function (err) { console.log(err.message); });
            var options = { limit: 1, duration: 60 };
            this.mediaCapture.captureVideo(options)
                .then(function (res) {
                var capturedFile = res[0];
                var fileName = capturedFile.name;
                _this.fileName = capturedFile.name;
                var type = capturedFile.type.split('/');
                _this.file_type = type[0];
                var dir = capturedFile['localURL'].split('/');
                dir.pop();
                var fromDirectory = dir.join('/');
                var toDirectory = _this.file.dataDirectory;
                var save_file = fromDirectory + '/' + _this.fileName;
                _this.uploadURI = save_file;
                /*let typetest=capturedFile.fullPath;
                this.filePathtest=(typetest).toString();
                             let options = {
                                          fileUri             : this.filePathtest,
                                          outputFileName      : new Date().getTime().toString() + '.mp4',
                                          outputFileType      : this.videoEditor.OutputFileType.MPEG4,
                                          saveToLibrary       : true,
                                          maintainAspectRatio : true,
                                          width               : 480,
                                          height              : 360,
                                          videoBitrate        : 500000,
                                          audioChannels       : 1,
                                          audioSampleRate     : 22050,
                                          audioBitrate        : 96000,
                                          progress            : (info: number) => {
                                            console.log('Progreso: ' + info * 100 + '%');
                                          }
                                        };
          
                                      this.videoEditor.transcodeVideo(options).then((pathTranscodedVideo: string) => {
                                        console.log(pathTranscodedVideo);
                                      }).catch(e => console.log(e));*/
                _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function () {
                    var option = { fileUri: toDirectory + _this.fileName, width: 160, height: 206, atTime: 1, outputFileName: _this.fileName, quality: 50 };
                    _this.playPath = toDirectory + _this.fileName;
                    _this.videoEditor.createThumbnail(option).then(function (result) {
                        //result-path of thumbnail
                        _this.thumbnail = result;
                        _this.inScreenLoader = true;
                        setTimeout(function () {
                            _this.inScreenLoader = false;
                        }, 5000);
                    }).catch(function (e) {
                        console.log(e);
                        // alert('fail video editor');
                    });
                    //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
                }, function (err) {
                    console.log('err: ', err);
                });
                /*this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
                  this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
                  
                },err => {
                  console.log('err: ', err);
                });*/
            }, function (err) { return console.error(err); });
        }
    };
    UploadPage.prototype.play = function () {
        if (this.file_type == 'audio') {
            // console.log('play')
            // console.log(this.uploadURI)
            // this.audiotag=true;
            // //this.audioFile = this.media.create(this.uploadURI);
            // console.log(this.myaudio)
            // if(this.myaudio==undefined){
            //   let audio = this.myaudio._element.nativeElement
            //   //this.play();
            // }else{
            //   let audio = this.myaudio._element.nativeElement
            //   console.log(audio)
            //   setTimeout(()=>{
            //   console.log(audio)
            //   audio.src = this.uploadURI;
            //   audio.play();
            //   console.log(audio)
            //   },500);
            // }
            var options = {
                bgColor: "#FFFFFF",
                bgImage: 'http://cdn1.theodysseyonline.com/files/2016/01/04/6358748036944186621892622963_music.jpg',
                bgImageScale: "fit",
                initFullscreen: true,
                keepAwake: true,
                successCallback: function () {
                    console.log("Player closed without error.");
                },
                errorCallback: function (errMsg) {
                    console.log("Error! " + errMsg);
                }
            };
            /* let options: StreamingAudioOptions = {
              successCallback: () => { console.log('Finished Audio') },
              errorCallback: (e) => { console.log('Error: ', e) },
              initFullscreen: false // iOS only!
             };*/
            var data = this.playPath;
            this.streamingMedia.playAudio(data, options);
        }
        else if (this.file_type == 'video') {
            // console.log('test')
            // this.videotag=true;
            // let path = this.file.dataDirectory + this.fileName;
            // console.log(path)
            // let url = path.replace(/^file:\/\//, '');
            // console.log(url)
            // if(this.myVideo==undefined){
            //   let video = this.myVideo.nativeElement;
            //   //this.play();
            // }else{
            //   let video = this.myVideo.nativeElement;
            //   setTimeout(()=>{
            //    video.src = url;
            //    video.play();
            //   },3000);
            // }  
            var options_1 = {
                successCallback: function () { console.log('Video played'); },
                errorCallback: function (e) { console.log('Error streaming'); },
                orientation: 'portrait',
                shouldAutoClose: false,
                controls: true
            };
            var data = this.playPath;
            this.streamingMedia.playVideo(data, options_1);
        }
    };
    UploadPage.prototype.stop = function () {
        var data = this.playPath;
        this.streamingMedia.stopAudio();
    };
    UploadPage.prototype.pause = function () {
        this.streamingMedia.pauseAudio();
    };
    UploadPage.prototype.resume = function () {
        this.streamingMedia.resumeAudio();
    };
    /*storeMediaFiles(files) {
      this.storage.get(MEDIA_FILES_KEY).then(res => {
        if (res) {
          let arr = JSON.parse(res);
          arr = arr.concat(files);
          this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
        } else {
          this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
        }
        this.mediaFiles = this.mediaFiles.concat(files);
      })
    }*/
    UploadPage.prototype.cancelSearch = function (event) {
        this.someValue = "";
        this.global.toggled = false;
        this.queryupload = 'myupload';
        //this.uploadget();
    };
    UploadPage.prototype.toggle = function () {
        var _this = this;
        this.global.toggled = this.global.toggled ? false : true;
        this.queryupload = 'myupload';
        setTimeout(function () {
            _this.myInput.setFocus();
        }, 150);
    };
    UploadPage.prototype.segmentClick = function (event) {
        if (localStorage.getItem("user_id") != null) {
            this.queryupload = event;
            if (event == 'myupload') {
                //this.uploaddeatils=[];
                if (this.uploaddeatils.length == 0) {
                    this.uploadget();
                }
            }
            else {
                //this.getlanguages();
                if (this.genres.length == 0) {
                    this.getGenre();
                }
            }
        }
        else {
            if (event == 'myupload') {
                //this.uploaddeatils=[];
                if (this.uploaddeatils.length == 0) {
                    this.uploadget();
                }
            }
        }
    };
    UploadPage.prototype.Upload = function () {
        var _this = this;
        if (this.user_id == null) {
            var toast = this.toastCtrl.create({
                message: 'Login to your Croon account',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        }
        else {
            //Android
            this.fileName = "";
            this.uploadURI = "";
            this.thumbnail = "";
            this.videotag = false;
            this.audiotag = false;
            if (this.platform.is('android')) {
                this.fileChooser.open()
                    .then(function (uri) {
                    var filedir = _this.file.dataDirectory + 'files/';
                    var record_file = 'Movies';
                    _this.file.writeExistingFile(filedir, record_file, 'folder').then(function (res) {
                    }).catch(function (err) { console.log(err.message); });
                    //this.uploadURI = uri;
                    _this.filePath.resolveNativePath(uri).then(function (filePath) {
                        /*this.filePathtest=(filePath).toString();
                        console.log(this.filePathtest)*/
                        _this.file.resolveLocalFilesystemUrl(filePath).then(function (fileEntry) {
                            return new Promise(function (resolve, reject) {
                                fileEntry.file(function (meta) { return resolve(meta); }, function (error) { return reject(error); });
                            });
                        }).then(function (fileMeta) {
                            //this.split_mimeType=fileMeta.type.split('/').toString()
                            var type = fileMeta.type.split('/');
                            _this.file_type = type[0];
                            if (_this.file_type == 'video' || _this.file_type == 'audio') {
                                // if(fileMeta.size<104857600){ 
                                _this.uploadURI = uri;
                                console.log(_this.uploadURI);
                                _this.fileName = fileMeta.name;
                                /*let options = {
                                             fileUri             : this.filePathtest,
                                             outputFileName      : new Date().getTime().toString() + '.mp4',
                                             outputFileType      : this.videoEditor.OutputFileType.MPEG4,
                                             saveToLibrary       : true,
                                             maintainAspectRatio : true,
                                             width               : 480,
                                             height              : 360,
                                             videoBitrate        : 500000,
                                             audioChannels       : 1,
                                             audioSampleRate     : 22050,
                                             audioBitrate        : 96000,
                                             progress            : (info: number) => {
                                               console.log('Progreso: ' + info * 100 + '%');
                                             }
                                           };
         
                                         this.videoEditor.transcodeVideo(options).then((pathTranscodedVideo: string) => {
                                           console.log(pathTranscodedVideo);
                                         }).catch(e => console.log(e));*/
                                if (_this.file_type == 'video') {
                                    var fileName = fileMeta.name;
                                    var dir = fileMeta['localURL'].split('/');
                                    dir.pop();
                                    var fromDirectory = dir.join('/');
                                    var toDirectory = _this.file.dataDirectory;
                                    _this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(function () {
                                        var option = { fileUri: toDirectory + _this.fileName, width: 160, height: 206, atTime: 1, outputFileName: _this.fileName, quality: 50 };
                                        _this.playPath = _this.uploadURI;
                                        _this.videoEditor.createThumbnail(option).then(function (result) {
                                            //result-path of thumbnail
                                            _this.thumbnail = result;
                                            _this.inScreenLoader = true;
                                            setTimeout(function () {
                                                _this.inScreenLoader = false;
                                            }, 5000);
                                        }).catch(function (e) {
                                            _this.fileName = "";
                                            _this.uploadURI = "";
                                            _this.showToast('bottom', 'Selected file is not supported!');
                                            // alert('fail video editor');
                                        });
                                    }, function (err) {
                                        console.log('err: ', err);
                                    });
                                }
                                else {
                                    _this.thumbnail = "assets/imgs/music1.jpg";
                                    _this.inScreenLoader = true;
                                    setTimeout(function () {
                                        _this.inScreenLoader = false;
                                    }, 5000);
                                    _this.playPath = _this.uploadURI;
                                }
                                // }else{
                                //   this.showToast('bottom','Selected file is too large(Maximum file size is 100MB)!'); 
                                // }  
                            }
                            else {
                                _this.showToast('bottom', 'Selected file is not supported!');
                            }
                        });
                    });
                })
                    .catch(function (e) { return console.log(e); });
            }
            //iOS
            if (this.platform.is('ios')) {
                /*this.filePicker.pickFile()
                .then(uri => {
                  this.uploadURI = uri[0]['path'];
                  this.file.resolveLocalFilesystemUrl(this.uploadURI).then((fileEntry: FileEntry) => {
                     return new Promise((resolve, reject) => {
                       fileEntry.file(meta => resolve(meta), error => reject(error));
                     });
                  }).then((fileMeta: IFile) => {
                  //this.split_mimeType=fileMeta.type.split('/').toString()
                   let type = fileMeta.type.split('/');
                   this.file_type = type[0];
           
                   if(this.file_type=='video' || this.file_type=='audio'){
                    this.uploadURI = fileMeta['localURL'];
                    this.fileName=fileMeta.name;
                    if(this.file_type=='video'){
                      let fileName = fileMeta.name;
                      let dir = fileMeta['localURL'].split('/');
                      console.log(dir)
                      dir.pop();
                      let fromDirectory = dir.join('/');
                      var toDirectory = this.file.dataDirectory;
                       
                      this.file.copyFile(fromDirectory, fileName, toDirectory,fileName).then(()=>{
                        var option:CreateThumbnailOptions = {fileUri:toDirectory+ this.fileName,width:160, height:206, atTime:1, outputFileName: this.fileName, quality:50 };
                         console.log(option)
                        this.playPath=this.file.dataDirectory+this.fileName;
                        this.videoEditor.createThumbnail(option).then(result=>{
                           //result-path of thumbnail
                           this.thumbnail=result;
                           this.inScreenLoader=true;
                           setTimeout(()=>{
                             this.inScreenLoader=false;
                           },5000);
                        }).catch(e=>{
                         console.log(e)
                         this.fileName="";
                         this.uploadURI="";
                         this.showToast('bottom','Selected file is not supported!');
                        // alert('fail video editor');
                        });
                      },err => {
                         console.log('err: ', err);
                      });
                    }else{
                      this.thumbnail="assets/imgs/music1.jpg";
                      this.inScreenLoader=true;
                       setTimeout(()=>{
                         this.inScreenLoader=false;
                       },5000);
                      console.log(uri[0]['title'])
                      if(uri[0]['title']==undefined || uri[0]['title']==null){
                        this.playPath=uri[0]['path'];
                        console.log(this.playPath)
                      }else{
                        this.playPath=uri[0]['path'];
                        console.log(this.playPath)
                      }
                    }
                   }else{
                    this.showToast('bottom','Selected file is not supported!');
                   }
           
                  });
                 })
                .catch(err => console.log('Error', err));*/
            }
        }
    };
    UploadPage.prototype.uploadget = function () {
        var _this = this;
        if (this.global.network_status == 2) {
            this.uploaddeatils = [];
            this.network_status = 2;
            this.inScreenLoader = true;
            if (this.user_id != null) {
                this.user = this.user_id;
            }
            else if (this.storeID != null) {
                this.user = this.storeID;
            }
            this.upload.uploaddisp(this.user) //,this.count_list
                .subscribe(function (res) {
                _this.inScreenLoader = false;
                _this.uploaddeatils = res;
                if (_this.uploaddeatils.length == _this.count_list) {
                    _this.showLoadMore = true;
                }
                else {
                    _this.showLoadMore = false;
                }
                //this.uploadCount=this.uploaddeatils.length;
                //localStorage.setItem("uploadcount",this.uploadCount); 
                _this.menu.upload_count();
            }, function (error) {
                _this.inScreenLoader = false;
                _this.uploaddeatils = [];
                console.log(error);
            });
        }
        else {
            this.network_status = 1;
            this.uploaddeatils = [];
        }
    };
    /*getlanguages(){
       this.uploadService.getLanguages()
              .subscribe(
              res => {
                  this.languages=res;
              },
              error => {
                  console.log(error);
        });
    }*/
    /*languagePopUp(lang){
      const alert = this.alertCtrl.create();
      
      alert.setTitle('Select Languages');
  
      this.languages.forEach(l => {
            alert.addInput({
                type: 'radio',
                label: l.language_name,
                value: l.id,
                checked: lang === l.language_name
            });
        });
  
      alert.addButton({
            text: 'Cancel',
            role: 'cancel',
      });
  
      alert.addButton({
            text: 'OK',
            handler: (id)=> {
             if(id!=undefined || id!=null){
              this.LanguageId=id;
              for(let i=0;i<this.languages.length;i++){
                if(this.languages[i].id==id){
                  this.LanguageName=this.languages[i].language_name;
                }
              }
             }
            }
      });
  
      alert.present();
    } */
    UploadPage.prototype.getGenre = function () {
        var _this = this;
        this.homeService.home_type()
            .subscribe(function (res) {
            _this.genres = res;
        }, function (error) {
            console.log(error);
        });
    };
    UploadPage.prototype.genrePopUp = function (genre) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Select Genres');
        this.genres.forEach(function (l) {
            alert.addInput({
                type: 'radio',
                label: l.genre_type,
                value: l.id,
                checked: genre === l.genre_type
            });
        });
        alert.addButton({
            text: 'Cancel',
            role: 'cancel',
        });
        alert.addButton({
            text: 'OK',
            handler: function (id) {
                if (id != undefined || id != null) {
                    _this.GenreId = id;
                    for (var i = 0; i < _this.genres.length; i++) {
                        if (_this.genres[i].id == id) {
                            _this.genreName = _this.genres[i].genre_type;
                        }
                    }
                }
            }
        });
        alert.present();
    };
    UploadPage.prototype.uploadVideo = function () {
        var _this = this;
        this.progress = 0;
        this.progressbar = true;
        var fileTransfer = this.transfer.create();
        this.data = {
            "title": this.fileName,
            "path": this.uploadURI,
            "user_id": this.user_id,
            "language_id": 1,
            "genre_id": this.GenreId,
            "file_type": this.file_type,
            "description": this.description
        };
        var options1 = {
            fileKey: 'video_upload_file',
            fileName: this.uploadURI,
            mimeType: 'multipart/form-data',
            params: this.data,
            chunkedMode: false,
            headers: { Connection: "close" }
        };
        /*this.presentLoading();*/
        fileTransfer.upload(this.uploadURI, this.global.baseUrl + '/users/new_upload', options1)
            .then(function (res) {
            /*this.loader.dismissAll();*/
            _this.progressbar = false;
            _this.datacheck = res.response;
            if (_this.datacheck == "true") {
                _this.fileName = "";
                _this.uploadURI = "";
                _this.LanguageId = "";
                _this.thumbnail = "";
                _this.GenreId = "";
                _this.description = "";
                _this.LanguageName = "Languages";
                _this.genreName = "Genres";
                _this.mediaFiles = [];
                _this.videotag = false;
                _this.audiotag = false;
                _this.playPath = "";
                localStorage.removeItem('videoNum');
                _this.showToast('bottom', _this.file_type + ' ' + 'is uploaded successfully!');
                _this.uploadlength();
                _this.uploadget();
                _this.menu.upload_count();
            }
            else {
                _this.showToast('bottom', _this.file_type + ' ' + 'uploaded is failed!');
            }
            //this.flag_upload = true;
        }, function (err) {
            // error
            console.log(err);
            _this.progressbar = false;
            //this.loader.dismissAll();
            _this.showToast('bottom', _this.file_type + ' ' + 'uploaded is failed!');
        });
        fileTransfer.onProgress(function (progressEvent) {
            _this._zone.run(function () {
                if (progressEvent.lengthComputable) {
                    var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    _this.progress = perc;
                }
            });
        });
    };
    UploadPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: 'Uploading…'
        });
        this.loader.present();
    };
    UploadPage.prototype.showToast = function (position, message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: position
        });
        toast.present(toast);
    };
    /*doInfinite(infiniteScroll) {
         
         console.log('testdo')
         setTimeout(() => {
           if(this.global.network_status==2){
             this.network_status=2;
             this.count_list=this.count_list+10;
             this.upload.uploaddisp_limit(this.user,this.count_list)//,this.count_list
             .subscribe(res=>{
              this.uploaddeatils=res;
              infiniteScroll.complete();
              if(this.uploaddeatils.length == this.count_list){
                this.showLoadMore=true;
              }else{
                this.showLoadMore=false;
              }
             },error=>{
              console.log(error)
             })
            console.log('cd')
           }else{
             infiniteScroll.complete();
           }
           }, 500);
     }
 
     onInput(event){
       
       if(this.global.network_status==2){
        this.uploaddeatils=[];
        this.network_status=2;
        this.inScreenLoader = true;
      
        if(this.user_id!=null){
         this.user=this.user_id;
       
        }else if(this.storeID!=null){
         this.user=this.storeID;
        }
        if(this.someValue.length!=0){
          this.upload.uploadSearch(this.user,this.someValue)//,this.count_list
          .subscribe(res=>{
            this.inScreenLoader = false;
            this.uploaddeatils=res;
            this.menu.upload_count();
          },error=>{
            this.inScreenLoader = false;
            this.uploaddeatils=[];
            console.log(error)
          })
        }else{
          this.upload.uploaddisp_limit(this.user,this.count_list)//
          .subscribe(res=>{
          this.inScreenLoader = false;
          this.uploaddeatils=res;
          if(this.uploaddeatils.length == this.count_list){
            this.showLoadMore=true;
          }else{
            this.showLoadMore=false;
          }
          //this.uploadCount=this.uploaddeatils.length;
          //localStorage.setItem("uploadcount",this.uploadCount);
          //this.menu.upload_count();
          },error=>{
            this.inScreenLoader = false;
            this.uploaddeatils=[];
            console.log(error)
          })
        }
       }else{
        this.network_status=1;
        this.uploaddeatils=[];
       }
     }*/
    UploadPage.prototype.delete = function (id) {
        console.log(id);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('input'),
        __metadata("design:type", Object)
    ], UploadPage.prototype, "myInput", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myvideo'),
        __metadata("design:type", Object)
    ], UploadPage.prototype, "myVideo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myaudio'),
        __metadata("design:type", Object)
    ], UploadPage.prototype, "myaudio", void 0);
    UploadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/upload/upload.html"*/'<ion-header>\n  <ion-toolbar color="dark-blue">\n    <span>\n      <button menuToggle ion-button icon-only clear>\n        <ion-icon name="md-menu"></ion-icon>\n      </button>\n    </span>\n    <img src="assets/imgs/header-logo.png">\n    <span>\n      <button ion-button icon-only (click)="notification()" clear>\n        <ion-icon name="ios-notifications-outline"></ion-icon>\n        <span class="notify" *ngIf="notify_count!=0" [hidden]="notify_count==undefined">{{notify_count}}</span>\n      </button>      \n    </span>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n\n   \n          <div class="subheader">\n            <h3 *ngIf="!global.toggled">Upload</h3>\n            <ion-icon id="upload_search_button" name="search" *ngIf="!global.toggled && queryupload == \'myupload\'" (click)="toggle()"></ion-icon>\n          </div>\n\n      \n       <!--  <ion-searchbar id="upload_search"\n           *ngIf="global.toggled"\n           [(ngModel)]="someValue"\n           (ionCancel)="cancelSearch($event)"\n           (ionInput)="onInput($event)"\n           [showCancelButton]="true" #input>\n        </ion-searchbar> -->\n\n         <ion-searchbar id="upload_search"\n           *ngIf="global.toggled"\n           [(ngModel)]="someValue"\n           (ionCancel)="cancelSearch($event)"\n           [showCancelButton]="true" #input>\n        </ion-searchbar>\n        \n        <ion-toolbar class="segment" *ngIf="!global.toggled">\n          <ion-segment [(ngModel)]="queryupload">\n            <ion-segment-button value="new" (click)="segmentClick(\'new\')" id="upload_new">\n              New\n            </ion-segment-button>\n            <ion-segment-button value="myupload" (click)="segmentClick(\'myupload\')" id="upload_myupload">\n               My Upload<span>{{uploadCount}}</span>\n            </ion-segment-button>\n          </ion-segment> \n        </ion-toolbar>\n        <div [ngSwitch]="queryupload">\n            <div class="new-up" *ngSwitchCase="\'new\'" (swipe)="new_to_myupload($event)">\n              <div class="button_group">\n                <div class="btn-label" id="upload_record">\n                  <button ion-button icon-only (click)="Audio()">\n                    <ion-icon name="mic"></ion-icon>\n                  </button>\n                  <p>Record</p>\n                </div>\n                <div class="btn-label" id="upload_video">\n                  <button ion-button icon-only (click)="Video()">\n                    <ion-icon name="videocam"></ion-icon>\n                  </button>\n                  <p>Record</p>\n                </div>\n                <div class="btn-label" id="upload_file_uplaod">\n                  <button ion-button icon-only (click)="Upload()">\n                    <ion-icon name="folder"></ion-icon>\n                  </button>\n                  <p>Upload</p>\n                </div>\n              </div>\n             \n              <ion-list *ngIf="thumbnail">\n                <ion-item>\n                  <ion-thumbnail item-start>\n                    <img src="{{thumbnail}}">\n                  </ion-thumbnail>\n                  <h2>{{fileName}}</h2>\n                  <button ion-button clear item-end (click)="play()" [hidden]="inScreenLoader">Play</button>\n                  <button ion-button clear item-end [hidden]="!inScreenLoader"><img src="assets/imgs/rotating-ring-loader.gif" style="width:50%"></button>\n                </ion-item>\n              </ion-list>\n              \n\n              <audio preload controls #myaudio *ngIf="audiotag"></audio>\n\n              <video controls="controls" preload="auto" #myvideo *ngIf="videotag" style="width:100%;height:auto"></video>\n              \n              <div class="input-group" id="upload_title">\n                <label>Title</label>\n                <input type="text" name="" [(ngModel)]="fileName">\n              </div>\n           \n              <div class="input-group">\n                <label>Genres</label>\n                <button ion-button block color="light" (click)="genrePopUp(genreName)" id="upload_languages">\n                  {{ genreName || \'Genres\' }}\n                </button>\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n              </div>\n              <!-- <div class="input-group">\n                <label>Select Languages</label>\n                <button ion-button block color="light" (click)="languagePopUp(LanguageName)" id="upload_languages">\n                  {{ LanguageName || \'Languages\' }}\n                </button>\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n              </div> -->\n              <div class="input-group">\n                <label>Description / Search Keyword</label>\n                <textarea class="upload_textarea" id="upload_description" [(ngModel)]="description"></textarea>\n              </div>\n              <button ion-button block class="button-blue-upload" id="upload_save_button" (click)="uploadVideo()" [disabled]="!uploadURI || !fileName || !GenreId || !description">UPLOAD</button>\n\n              <div class="backdrop" *ngIf="progressbar">\n                  <ion-card>\n                    <ion-card-header>\n                      Uploading..<span>({{ progress }}%)</span>\n                    </ion-card-header>\n                    <ion-card-content>\n                      <div class="progressbar" > \n                          <div class="inner-progressbar" [style.width]="progress+\'%\'"> \n                          </div>\n                      </div>\n                    </ion-card-content>\n                  </ion-card>\n              </div>\n\n            </div>\n\n\n            \n           <ion-list *ngSwitchCase="\'myupload\'" (swipe)="myupload_to_new($event)">\n              \n              <div class="no_matches" *ngIf="inScreenLoader">\n                <img src="assets/imgs/rotating-ring-loader.gif">\n              </div>\n\n              <div class="user_list" *ngFor="let user of uploaddeatils | homeSearch:someValue;let i = index" id="upload_details">\n                <button ion-item (click)="openModal(user.id,user,user.rank)">\n                  <ion-avatar item-start>\n                    <img src="assets/imgs/contactIcon.png" *ngIf="user.user.image.length==0 || user.user.image[0].image_path.url==null">\n                    <img src="{{user.user.image[0].image_path.url}}" *ngIf="user.user.image.length!=0 && user.user.image[0].image_path.url!=null">\n                  </ion-avatar>\n                  <h2>{{user.title}}</h2>\n                  <p><span><ion-icon name="ios-person-outline"></ion-icon>{{user.user.first_name}}</span><span><ion-icon name="ios-star-outline"></ion-icon>{{user.votes.length}} votes</span><span><ion-icon name="ios-trophy-outline"></ion-icon>Rank {{user.rank}}</span></p>\n                </button>\n                <button ion-button icon-only clear class="btn-action" id="upload_share_button" (click)="regularShare(user.id)">\n                  <ion-icon name="md-share"></ion-icon>\n                </button>\n                <button ion-button icon-only clear class="btn-action" id="upload_share_button1" (click)="delete(user.id)">\n                  <ion-icon name="md-trash"></ion-icon>\n                </button>\n              </div>\n\n              <div class="no_matches" *ngIf="(uploaddeatils | homeSearch:someValue).length==0 && (uploaddeatils).length!=0 && !inScreenLoader">\n               <img src="assets/imgs/myupload.png">\n               <h5 class="no_data">No Search results found</h5>\n              </div>\n\n            <!-- <div *ngIf="showLoadMore"> \n             <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n               <ion-infinite-scroll-content  loadingSpinner="bubbles"\n                loadingText="Loading more data..."></ion-infinite-scroll-content>\n             </ion-infinite-scroll>\n            </div>  -->\n\n              <div  class="no_matches" *ngIf="(uploaddeatils).length==0 && user_id!=null && network_status == 2 && !inScreenLoader && (uploaddeatils | homeSearch:someValue).length==0 || (uploaddeatils).length==0 && storeID!=null && network_status == 2 && !inScreenLoader && (uploaddeatils | homeSearch:someValue).length==0">\n                <img src="assets/imgs/myupload.png">\n                <h5 class="no_data">No Records found</h5>\n              </div>\n\n              <div class="no_matches" *ngIf="user_id==null && storeID==null && network_status == 2 && !inScreenLoader">\n                <img src="assets/imgs/myupload1.png">\n                <h5>Upload Your Genres</h5>\n                <p>No genres has uploaded yet</p>\n              </div>\n\n              <div class="no_internet1" *ngIf="network_status == 1 && !inScreenLoader">\n                <img src="assets/imgs/no_internet.png">\n                <h5>Oops!!</h5>\n                <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n                <button ion-button color="light" round item-end icon-start (click)="uploadget()">\n                    <ion-icon name="refresh"></ion-icon> Try again\n                </button>\n              </div>\n            </ion-list>\n        </div>\n\n</ion-content>'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/upload/upload.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__providers_myvotes_myvotes__["a" /* VotesProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_12__providers_upload_upload__["a" /* UploadProvider */], __WEBPACK_IMPORTED_MODULE_13__providers_home_home__["a" /* HomeProvider */], __WEBPACK_IMPORTED_MODULE_14__providers_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_video_editor__["a" /* VideoEditor */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_17__menu_menu__["a" /* MenuPage */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_streaming_media__["a" /* StreamingMedia */]])
    ], UploadPage);
    return UploadPage;
}());

//# sourceMappingURL=upload.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_onesignal__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { HockeyApp } from 'ionic-hockeyapp';



//import { Deeplinks } from '@ionic-native/deeplinks';




var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, app, alertCtrl, global, network, androidPermissions, toast, file, oneSignal) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.network = network;
        this.androidPermissions = androidPermissions;
        this.toast = toast;
        this.file = file;
        this.oneSignal = oneSignal;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* MenuPage */];
        //ViewChild('myNav') nav: NavController
        this.counter = 0;
        platform.ready().then(function () {
            // this.deeplinks.routeWithNavController(this.nav,{
            //     '/hats/:hatId': MenuPage
            // }).subscribe((match) => {
            // }, (nomatch) => {
            // });
            //console.log(this.nav.getActive().name);
            /* platform.registerBackButtonAction(() => {
              if (this.counter == 0) {
                this.counter++;
                this.presentToast();
                setTimeout(() => { this.counter = 0 }, 2000)
              } else {
                // console.log("exitapp");
                platform.exitApp();
              }
            }, 0)
      */
            // The Android ID of the app as provided by the HockeyApp portal. Can be null if for iOS only.
            /*let androidAppId = '3f6000180b044597b1f44364fef8b3a0';
            // The iOS ID of the app as provided by the HockeyApp portal. Can be null if for android only.
            let iosAppId = 'cdbaa6ede0d94964bb6c443bd2accce3';
            // Specifies whether you would like crash reports to be automatically sent to the HockeyApp server when the end user restarts the app.
            let autoSendCrashReports = false;
            // Specifies whether you would like to display the standard dialog when the app is about to crash. This parameter is only relevant on Android.
            let ignoreCrashDialog = true;
             
            hockeyapp.start(androidAppId, iosAppId, autoSendCrashReports, ignoreCrashDialog);*/
            _this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705');
            _this.oneSignal.inFocusDisplaying(_this.oneSignal.OSInFocusDisplayOption.Notification);
            _this.oneSignal.setSubscription(true);
            _this.oneSignal.getIds().then(function (id) {
                localStorage.setItem("player_id", id.userId);
            });
            _this.oneSignal.endInit();
            androidPermissions.requestPermissions([
                androidPermissions.PERMISSION.CAMERA,
                androidPermissions.PERMISSION.RECORD_AUDIO,
                androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
                androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
            ]);
            network.onDisconnect().subscribe(function () {
                _this.global.network_status = 1;
                localStorage.removeItem("noti_page");
                localStorage.removeItem("noti_genre_id");
                localStorage.removeItem("noti_genre_type");
            });
            network.onConnect().subscribe(function () {
                _this.global.network_status = 2;
            });
            statusBar.styleLightContent();
            statusBar.backgroundColorByHexString('#01222d');
            splashScreen.hide();
        });
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // do whatever you need to do here.
            setTimeout(function () {
                _this.splashScreen.hide();
            }, 100);
        });
    };
    MyApp.prototype.presentToast = function () {
        this.toast.show("Press again to exit", '2000', 'bottom').subscribe(function (toast) {
            console.log(toast);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], MyApp.prototype, "naV", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_onesignal__["a" /* OneSignal */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollHideDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScrollHideDirective = /** @class */ (function () {
    function ScrollHideDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.lastValue = 0;
    }
    ScrollHideDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.scrollContent && this.config) {
            this.scrollContent.ionScrollStart.subscribe(function (ev) {
                _this.contentHeight = _this.scrollContent.getScrollElement().offsetHeight;
                _this.scrollHeight = _this.scrollContent.getScrollElement().scrollHeight;
                if (_this.config.maxValue === undefined) {
                    _this.config.maxValue = _this.element.nativeElement.offsetHeight;
                }
                _this.lastScrollPosition = ev.scrollTop;
            });
            this.scrollContent.ionScroll.subscribe(function (ev) { return _this.adjustElementOnScroll(ev); });
            this.scrollContent.ionScrollEnd.subscribe(function (ev) { return _this.adjustElementOnScroll(ev); });
        }
    };
    ScrollHideDirective.prototype.adjustElementOnScroll = function (ev) {
        var _this = this;
        if (ev) {
            ev.domWrite(function () {
                var scrollTop = ev.scrollTop > 0 ? ev.scrollTop : 0;
                var scrolldiff = scrollTop - _this.lastScrollPosition;
                _this.lastScrollPosition = scrollTop;
                var newValue = _this.lastValue + scrolldiff;
                newValue = Math.max(0, Math.min(newValue, _this.config.maxValue));
                _this.renderer.setStyle(_this.element.nativeElement, _this.config.cssProperty, "-" + newValue + "px");
                _this.lastValue = newValue;
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])('scrollHide'),
        __metadata("design:type", Object)
    ], ScrollHideDirective.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */])('scrollContent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* Content */])
    ], ScrollHideDirective.prototype, "scrollContent", void 0);
    ScrollHideDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["s" /* Directive */])({
            selector: '[scrollHide]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["W" /* Renderer2 */]])
    ], ScrollHideDirective);
    return ScrollHideDirective;
}());

//# sourceMappingURL=scroll-hide.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NotificationProvider = /** @class */ (function () {
    function NotificationProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello NotificationProvider Provider');
    }
    NotificationProvider.prototype.notificationDetails = function (id) {
        return this.http.get(this.global.baseUrl + '/users/notification_status?notification_id=' + id);
    };
    // notificationList():Observable<any>{
    //  return this.http.get(this.global.baseUrl + '/users/notification_view')
    //   .map((response:Response) =>response.json())
    // }
    NotificationProvider.prototype.notificationList_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/notification_view?user_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    NotificationProvider.prototype.notificationCount = function (id) {
        return this.http.get(this.global.baseUrl + '/users/notification_count?user_id=' + id);
    };
    NotificationProvider.prototype.notificationDelete = function (id) {
        return this.http.get(this.global.baseUrl + '/users/notification_delete?notification_id=' + id);
    };
    NotificationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Globals */]])
    ], NotificationProvider);
    return NotificationProvider;
}());

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_myvotes_myvotes__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, toast, global, app, facebook, googlePlus, upload) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toast = toast;
        this.global = global;
        this.app = app;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.upload = upload;
        this.rootPage = 'TabsPage';
        if (localStorage.getItem("user_id") != null) {
            this.user_id = localStorage.getItem("user_id");
            if (localStorage.getItem("user_image") != null) {
                this.user_image = localStorage.getItem("user_image");
            }
            if (localStorage.getItem("user_name") != null) {
                this.user_name = localStorage.getItem("user_name");
            }
            else {
                this.user_name = '';
            }
        }
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.pages = [
            { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'ios-home-outline' },
            { title: 'Settings', pageName: 'SettingsPage', icon: 'ios-settings-outline' },
            { title: 'About', pageName: 'AboutPage', icon: 'ios-information-circle-outline' },
            { title: 'Login', pageName: 'LoginPage', icon: 'ios-log-in-outline' },
            { title: 'Logout', pageName: 'TabsPage', tabComponent: 'HomePage', icon: 'ios-power' },
            { title: 'Change Password', pageName: 'ChangepasswordPage', icon: 'ios-unlock-outline' },
            { title: 'Profile', pageName: 'ProfilePage', icon: 'ios-contact-outline' }
        ];
        if (this.user_id != null) {
            this.upload.uploaddisp(this.user_id).subscribe(function (res) {
                _this.uploadlist = res.length;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.uploadlist = 0;
        }
    };
    MenuPage.prototype.upload_count = function () {
        var _this = this;
        if (this.user_id != null) {
            this.upload.uploaddisp(this.user_id).subscribe(function (res) {
                _this.uploadlist = res.length;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.uploadlist = 0;
        }
    };
    MenuPage.prototype.openPage = function (page) {
        var _this = this;
        var params = {};
        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        }
        else {
            this.nav.setRoot(page.pageName, params);
        }
        if (page.title == 'Logout') {
            this.user_id = null;
            localStorage.removeItem("Rank");
            localStorage.removeItem("ViewDetails");
            localStorage.removeItem("pageNav");
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_image");
            localStorage.removeItem("user_name");
            localStorage.removeItem("uploadpage");
            if (localStorage.getItem("login_status") == 'google') {
                localStorage.removeItem("login_status");
                this.googlePlus.logout()
                    .then(function (res) {
                }).catch(function (err) { return console.error(err); });
            }
            else if (localStorage.getItem("login_status") == 'facebook') {
                localStorage.removeItem("login_status");
                this.facebook.logout()
                    .then(function (res) {
                    console.log(res);
                }).catch(function (err) { return console.error(err); });
            }
            this.toast.show("You have logged out successfully", '2000', 'bottom').subscribe(function (toast) {
                console.log(toast);
            });
        }
        if (this.user_id != null) {
            this.upload.uploaddisp(this.user_id).subscribe(function (res) {
                _this.uploadlist = res.length;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.uploadlist = 0;
        }
    };
    MenuPage.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNav();
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
        }
        return;
    };
    MenuPage.prototype.goto_login = function () {
        this.navCtrl.setRoot('LoginPage');
    };
    MenuPage.prototype.goto_myvotes = function () {
        this.nav.getActiveChildNav().select(2);
    };
    MenuPage.prototype.goto_myupload = function () {
        localStorage.setItem("uploadpage", "myupload");
        //this.nav.getActiveChildNav().select(1);
        this.nav.setRoot('TabsPage', { tabIndex: 1 });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/menu/menu.html"*/'<ion-menu [content]="content"> \n  <ion-content>\n    <button ion-item menuClose class="menu-login"  *ngIf="user_id == null" (click)="openPage(pages[3])">\n      <h2>Log In To Your Croon Account</h2>\n      <p>Sync Your Profile Across The Device</p>\n      <ion-icon name="ios-arrow-forward" item-end></ion-icon>\n    </button>\n\n    <div class="menu-profile-pic" *ngIf="user_id > 0">\n      <img src="assets/imgs/profileIcon.jpg" *ngIf="user_image==null || user_image==\'null\'">\n      <img src="{{user_image}}" *ngIf="user_image!=null && user_image!=undefined || user_image!=\'null\' && user_image!=undefined">\n      <h4 *ngIf="user_name!=\'null\' || user_name!=null">{{user_name}}</h4>\n    </div>\n    <ion-item-group *ngIf="user_id > 0">\n      <ion-item-divider color="light">Statistics</ion-item-divider>\n      <button ion-item menuClose (click)="goto_myupload()">\n          <ion-icon name="ios-log-out-outline"></ion-icon>\n          Total Uploads\n      </button>\n    </ion-item-group>\n    <ion-item-group>\n      <ion-item-divider color="light">Other</ion-item-divider>\n     \n      <button ion-item menuClose (click)="openPage(pages[0])">\n          <ion-icon name="ios-home-outline"></ion-icon>\n          Home\n      </button>\n     <button ion-item menuClose (click)="openPage(pages[2])">\n          <ion-icon name="ios-information-circle-outline"></ion-icon>\n          About\n      </button>\n\n      <button ion-item menuClose *ngIf="user_id > 0" (click)="openPage(pages[6])">\n          <ion-icon name="ios-contact-outline"></ion-icon>\n         Profile\n      </button> \n\n       <button ion-item menuClose *ngIf="user_id > 0" (click)="openPage(pages[5])">\n          <ion-icon name="ios-unlock-outline"></ion-icon>\n         Change Password\n      </button>\n\n      <button ion-item menuClose *ngIf="user_id > 0" (click)="openPage(pages[4])">\n          <ion-icon name="ios-power"></ion-icon>\n         Logout\n      </button>\n    </ion-item-group>\n  </ion-content>\n</ion-menu>\n \n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/menu/menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__["a" /* Toast */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_6__providers_myvotes_myvotes__["a" /* VotesProvider */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VotesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var VotesProvider = /** @class */ (function () {
    function VotesProvider(http, global, https) {
        this.http = http;
        this.global = global;
        this.https = https;
        console.log('Hello VotesProvider Provider');
    }
    VotesProvider.prototype.votedisp = function (id) {
        return this.http.get(this.global.baseUrl + '/users/myvotes?user_id=' + id)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.uploaddisp = function (id) {
        return this.http.get(this.global.baseUrl + '/users/myuploads?user_id=' + id)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.votedisp_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/myvotes?user_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.uploaddisp_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/myuploads?user_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.register = function (data) {
        return this.https.post(this.global.baseUrl + '/users/profile_upload', JSON.stringify(data), httpOptions);
    };
    VotesProvider.prototype.uploadSearch = function (userId, keyword) {
        return this.http.get(this.global.baseUrl + '/users/my_upload_search?user_id=' + userId + '&&keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.votesSearch = function (userId, keyword) {
        return this.http.get(this.global.baseUrl + '/users/my_vote_search?user_id=' + userId + '&&keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    VotesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], VotesProvider);
    return VotesProvider;
}());

//# sourceMappingURL=myvotes.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_search_home_search__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__home_search_home_search__["a" /* HomeSearchPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__home_search_home_search__["a" /* HomeSearchPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HomeProvider = /** @class */ (function () {
    function HomeProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello HomeProvider Provider');
    }
    HomeProvider.prototype.homeGenre = function (id) {
        return this.http.get(this.global.baseUrl + '/users/toplist?genre_id=' + id)
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.homeSearch = function (genreId, keyword) {
        return this.http.get(this.global.baseUrl + '/users/search_toplist?genre_id=' + genreId + '&&keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.home_type = function () {
        return this.http.get(this.global.baseUrl + '/users/genres')
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.home_type_first = function () {
        return this.http.get(this.global.baseUrl + '/users/genres_first')
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.model_upload = function (uploader_id) {
        return this.http.get(this.global.baseUrl + '/users/view_uploads?upload_id=' + uploader_id)
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.homeGenre_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/toplist?genre_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    HomeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Globals */]])
    ], HomeProvider);
    return HomeProvider;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Globals; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])();
var Globals = /** @class */ (function () {
    function Globals() {
        this.toggled = false;
        //Local IP Config
        /*baseUrl="http://192.168.1.61:4000/api/v1";
        imageUrl="http://192.168.1.61:4000";
        shareUrl="http://192.168.1.61:4000/";*/
        /*  Local IP Port Forwarding Config
          baseUrl="http://115.111.129.98:4003/api/v1";
          imageUrl="http://115.111.129.98:4003";
          shareUrl="http://115.111.129.98:4003/";*/
        /*
        baseUrl="http://54.88.33.35/api/v1";
        imageUrl="http://54.88.33.35";
        shareUrl="http://54.88.33.35/";*/
        this.baseUrl = "https://app.croonapp.com/api/v1";
        this.imageUrl = "https://app.croonapp.com";
        this.shareUrl = "https://app.croonapp.com/";
        /* baseUrl="http://192.168.1.61:4005/api/v1";
         imageUrl="http://192.168.1.61:4005";
         shareUrl="http://192.168.1.61:4005";*/
    }
    return Globals;
}());

//# sourceMappingURL=global.js.map

/***/ })

},[239]);
//# sourceMappingURL=main.js.map