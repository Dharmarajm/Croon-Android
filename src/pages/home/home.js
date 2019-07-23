var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core'; /*AfterViewInit, Renderer*/
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, App, Nav } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { ModalController, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../providers/global';
import { NotificationProvider } from '../../providers/notification/notification';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { Slides } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
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
            console.log('platform');
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
            console.log('trigger');
            _this.triggerNotification();
        });
        this.count_list = 10;
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
        this.platform.ready().then(function () {
            console.log('platform');
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
    HomePage.prototype.ionViewDidEnter = function () {
        //this.navCtrl.push('HistoryPage',{'tabIndex':'3'})
    };
    HomePage.prototype.triggerNotification = function () {
        var _this = this;
        this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705');
        console.log(this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705'));
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        console.log(localStorage.getItem("player_id"));
        this.oneSignal.getIds().then(function (id) {
            console.log(id);
            localStorage.setItem("player_id", id.userId);
            console.log(localStorage.getItem("player_id"));
        });
        //this.oneSignal.setSubscription(true);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
            // handle received here how you wish.
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (result) {
            console.log(result);
            _this.assignPush = JSON.stringify(result.notification.isAppInFocus);
            _this.getPushData = result.notification.payload.additionalData;
            localStorage.setItem("action", _this.assignPush);
            if (localStorage.getItem("action") == 'false') {
                console.log('notfocus');
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
                console.log('focus', result);
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
                    console.log(_this.network_status);
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
    HomePage.prototype.openModal = function (user) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("which_page", "Homepage");
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
                        _this.openModal(user_1);
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
                _this.openModal(user);
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
        ViewChild('myContent'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "myContent", void 0);
    __decorate([
        ViewChild('mySlider'),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "slider", void 0);
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [App, Nav, NavController, NavParams, Platform, AlertController, ModalController, HttpClient, HomeProvider, Globals, LoadingController, NotificationProvider, Network, OneSignal, ViewController, Toast])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map