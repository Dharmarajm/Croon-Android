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
import { IonicPage, NavController, NavParams, LoadingController, Platform, App, Nav } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { ModalController } from 'ionic-angular';
import { Globals } from '../../providers/global';
import { OneSignal } from '@ionic-native/onesignal';
var SearchPage = /** @class */ (function () {
    function SearchPage(app, navCtrl, nav, navParams, SearchService, modalCtrl, global, loadingCtrl, platform, oneSignal) {
        var _this = this;
        this.app = app;
        this.navCtrl = navCtrl;
        this.nav = nav;
        this.navParams = navParams;
        this.SearchService = SearchService;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.oneSignal = oneSignal;
        this.SearchOrder = [];
        this.limit = 100;
        this.Template = false;
        this.searchTemplate = false;
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.pop();
            }, 0);
            _this.triggerNotification();
        });
        if (localStorage.getItem("user_id") != null) {
            this.ID = localStorage.getItem("user_id");
        }
        else {
            this.ID = null;
        }
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.display_details = 0;
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
        this.prevPage = this.navCtrl.last().name;
    };
    SearchPage.prototype.ionViewWillEnter = function () {
        this.tabBarElement.style.display = 'none';
        if (this.global.network_status == 2) {
            this.network_status = 2;
        }
        else {
            this.network_status = 1;
        }
    };
    SearchPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 150);
    };
    /*button_focus() {
         window.setTimeout(() => {
           this.myInput.setFocus();
         }, 1000);
    }*/
    SearchPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    SearchPage.prototype.triggerNotification = function () {
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
                        _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                    }
                    else {
                        _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                    }
                }
                else if (localStorage.getItem("noti_page") == "home") {
                    _this.nav.setRoot('TabsPage', { tabIndex: 0 });
                }
                else {
                    _this.nav.setRoot('TabsPage', { tabIndex: 3 });
                }
            }
        });
        this.oneSignal.endInit();
    };
    SearchPage.prototype.cancelSearch = function () {
        this.navCtrl.pop();
    };
    SearchPage.prototype.onEnter = function (e) {
        if (e.keyCode == 13) {
            console.log('it is worked');
            var activeElement = document.activeElement;
            activeElement && activeElement.blur && activeElement.blur();
        }
        if (this.navCtrl.getPrevious().name == 'HomePage') {
            this.keywords_list();
        }
        else {
            this.HistorySearch();
        }
    };
    SearchPage.prototype.keywords_list = function () {
        var _this = this;
        if (this.someValue.length > 0) {
            if (this.global.network_status == 2) {
                this.network_status = 2;
                this.SearchService.home_keywords_list(this.someValue)
                    .subscribe(function (res) {
                    _this.Search_keywords = res;
                    _this.display_details = 1;
                    if (_this.Search_keywords.length == 0) {
                        _this.display_details = 3;
                    }
                }, function (error) {
                });
            }
            else {
                this.Search_keywords = [];
                this.display_details = 1;
                this.network_status = 1;
            }
        }
        else {
            this.Search_keywords = [];
            this.display_details = 0;
        }
    };
    SearchPage.prototype.keywords_details = function (keyword_name) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.SearchService.homeTopList(keyword_name)
                .subscribe(function (res) {
                _this.SearchOrder = res;
                _this.display_details = 2;
            }, function (error) {
            });
        }
        else {
            this.display_details = 2;
            this.network_status = 1;
        }
    };
    SearchPage.prototype.HistorySearch = function () {
        var _this = this;
        this.SearchService.historyOrder(this.someValue, this.limit)
            .subscribe(function (res) {
            _this.SearchOrder = res;
            _this.Template = true;
        }, function (error) {
        });
    };
    SearchPage.prototype.openModal = function (user) {
        var _this = this;
        if (this.global.network_status == 2) {
            localStorage.setItem("ViewDetails", user);
            var data = { message: 'hello world' };
            var modalPage = this.modalCtrl.create('ModalPage', data);
            modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        _this.navCtrl.pop();
                    }, 0);
                    _this.triggerNotification();
                });
            });
            modalPage.present();
            localStorage.setItem("pageNav", this.navCtrl.last().name);
        }
        else {
            this.SearchOrder = [];
            this.network_status = 1;
        }
    };
    __decorate([
        ViewChild('myInput'),
        __metadata("design:type", Object)
    ], SearchPage.prototype, "myInput", void 0);
    SearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
        }),
        __metadata("design:paramtypes", [App, NavController, Nav, NavParams, SearchProvider, ModalController, Globals, LoadingController, Platform, OneSignal])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.js.map