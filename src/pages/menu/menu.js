/* import { ChangepasswordPage } from './../changepassword/changepassword';
import { AboutPage } from './../about/about';
import { SettingsPage } from './../settings/settings';
import { HomePage } from './../home/home'; */
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
import { IonicPage, NavController, Nav, NavParams, App } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Globals } from '../../providers/global';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { VotesProvider } from '../../providers/myvotes/myvotes';
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, toast, global, app, facebook, googlePlus, upload) {
        // private googlePlus: GooglePlus,
        // this.hatId = navParams.get('hatId');
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
                    console.log(res);
                }).catch(function (err) { return console.error(err); });
            }
            else if (localStorage.getItem("login_status") == 'facebook') {
                localStorage.removeItem("login_status");
                this.facebook.logout()
                    .then(function (res) {
                    console.log(res);
                }).catch(function (err) { return console.error(err); });
            }
            this.toast.show("You logout successfully", '2000', 'bottom').subscribe(function (toast) {
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
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Toast, Globals, App, Facebook, GooglePlus, VotesProvider])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map