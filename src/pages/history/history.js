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
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, App, Nav } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { Globals } from '../../providers/global';
import { NotificationProvider } from '../../providers/notification/notification';
import { Network } from '@ionic-native/network';
import { Slides } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { Toast } from '@ionic-native/toast';
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
            console.log('platform');
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
        console.log(this.inScreenLoader);
        if (this.global.network_status == 2) {
            console.log(this.global.network_status);
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
            console.log('before');
            if (this.types.length == 0 && this.first == false && localStorage.getItem("noti_genre_type") == undefined) {
                this.network_status = 1;
            }
        }
        else {
            console.log(this.global.network_status);
            this.network_status = 1;
            this.history_music_Result = [];
            this.history_music_values = [];
        }
        if (this.first == true) {
            this.first = false;
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
            }
            else {
                console.log('focus', result);
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
            }
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
                    _this.end_date = res[0].end_date;
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
                    console.log(res);
                    for (var i = 0; i < Object.keys(_this.types).length; i++) {
                        if (_this.current_type != undefined || _this.current_type != null) {
                            if (_this.types[i].genre_type == _this.current_type) {
                                console.log(_this.types_first);
                                _this.genre_id = _this.types[i].id;
                                _this.current_type = _this.types[i].genre_type;
                                _this.current_type_id = _this.types[i].id;
                                _this.selectedSegment = _this.types[i].genre_type;
                                _this.function_switch(3);
                            }
                        }
                        else {
                            console.log(_this.types_first);
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
                        _this.openModal(user);
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
                _this.inScreenLoader = false;
                _this.start_end_dates = res;
                if (_this.start_end_dates != null) {
                    _this.start_date = _this.start_end_dates.start_date;
                    _this.end_date = _this.start_end_dates.end_date;
                    _this.dates_id = _this.start_end_dates.id;
                    _this.service.history_music_details_limit(_this.dates_id, _this.genre_id, _this.count_list)
                        .subscribe(function (res) {
                        _this.history_music_values = res;
                        if (Object.keys(_this.history_music_values).length == 0) {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                        else {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                    }, function (error) {
                        _this.inScreenLoader = false;
                        console.log(error);
                        /*let alert = this.alertCtrl.create({
                          title: `Server error`,
                          message: `<p>There are issues connecting to Croon.please try again later.</p> `,
                          buttons: ['Ok']
                        });
                        alert.present();*/
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
            this.btnColor_next = '#fccb2b';
            this.colors_pre = '#ffffff';
            this.colors_next = '#002b3d';
            this.service.history_paticular_dates(name, this.start_date)
                .subscribe(function (res) {
                _this.inScreenLoader = false;
                _this.start_end_dates = res;
                if (_this.start_end_dates != null) {
                    _this.start_date = _this.start_end_dates.start_date;
                    _this.end_date = _this.start_end_dates.end_date;
                    _this.dates_id = _this.start_end_dates.id;
                    _this.service.history_music_details_limit(_this.dates_id, _this.genre_id, _this.count_list)
                        .subscribe(function (res) {
                        _this.history_music_values = res;
                        if (Object.keys(_this.history_music_values).length == 0) {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                        else {
                            _this.history_music_Result = Object.keys(_this.history_music_values).length;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.inScreenLoader = false;
                        /*let alert = this.alertCtrl.create({
                          title: `Server error`,
                          message: `There are issues connecting to Croon.please try again later.`,
                          buttons: ['Ok']
                        });
                        alert.present();*/
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
        console.log(slider);
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
                    _this.openModal(user);
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
    HistoryPage.prototype.openModal = function (user) {
        var _this = this;
        if (this.global.network_status == 2) {
            this.network_status = 2;
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("which_page", "Historypage");
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
                    /*let alert = this.alertCtrl.create({
                      title: `Server error`,
                      message: `<p>There are issues connecting to Croon.please try again later.</p> `,
                      buttons: ['Ok']
                    });
                    alert.present();*/
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
            console.log(this.slider._activeIndex);
            this.type(this.types_first, this.slider._activeIndex);
        }
    };
    __decorate([
        ViewChild('mySlider'),
        __metadata("design:type", Slides)
    ], HistoryPage.prototype, "slider", void 0);
    HistoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-history',
            templateUrl: 'history.html',
        }),
        __metadata("design:paramtypes", [App, Nav, Platform, NavController, HistoryProvider, NavParams, ModalController, Globals, LoadingController, AlertController, ToastController, NotificationProvider, Network, OneSignal, ViewController, Toast])
    ], HistoryPage);
    return HistoryPage;
}());
export { HistoryPage };
//# sourceMappingURL=history.js.map