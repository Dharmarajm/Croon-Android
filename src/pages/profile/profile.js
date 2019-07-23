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
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, App, Nav } from 'ionic-angular';
//import { LoginPage } from './../login/login';
import { MenuPage } from '../menu/menu';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { VotesProvider } from '../../providers/myvotes/myvotes';
import { Toast } from '@ionic-native/toast';
import { Globals } from '../../providers/global';
import { OneSignal } from '@ionic-native/onesignal';
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
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot(MenuPage);
            }, 0);
            _this.triggerNotification();
        });
        this.user_image = localStorage.getItem("user_image");
        if (localStorage.getItem("user_image") != null) {
            this.imgPreview = localStorage.getItem("user_image");
            this.user_image = this.imgPreview;
        }
        else {
            this.imgPreview = "assets/imgs/person.jpg";
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
            console.log(id.userId);
            localStorage.setItem("player_id", id.userId);
        });
        //this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            // handle received here how you wish.
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (result) {
            _this.assignPush = JSON.stringify(result.notification.isAppInFocus);
            _this.getPushData = result.notification.payload.additionalData;
            localStorage.setItem("action", _this.assignPush);
            if (localStorage.getItem("action") == 'false') {
            }
            else {
                console.log('focus', result);
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
            }
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
            _this.user_image = null;
            for (var i = 0; i < results.length; i++) {
                _this.imgPreview = results[i];
                _this.base64.encodeFile(results[i]).then(function (base64File) {
                    _this.image = base64File;
                }, function (err) {
                    console.log(err);
                });
            }
        }, function (err) { });
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
                console.log(err);
                _this.loading.dismiss();
                _this.toast.show("Uploading Failed", '2000', 'bottom').subscribe(function (toast) {
                    console.log(err);
                });
            });
        }
        this.navCtrl.setRoot(MenuPage);
    };
    ProfilePage.prototype.back = function () {
        this.navCtrl.setRoot(MenuPage);
    };
    ProfilePage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...'
        });
        this.loading.present();
    };
    ProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html',
        }),
        __metadata("design:paramtypes", [App, Nav, NavController, NavParams, Platform, VotesProvider, ImagePicker, Base64, LoadingController, AlertController, MenuPage, Toast, Globals, OneSignal])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map