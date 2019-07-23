webpackJsonp([4],{

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageModule", function() { return SearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search__ = __webpack_require__(339);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchPageModule = /** @class */ (function () {
    function SearchPageModule() {
    }
    SearchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search__["a" /* SearchPage */]),
            ],
        })
    ], SearchPageModule);
    return SearchPageModule;
}());

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_search_search__ = __webpack_require__(236);
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
            //this.triggerNotification();
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
        }, 600);
    };
    SearchPage.prototype.ionViewWillLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    // triggerNotification(){
    //      this.oneSignal.startInit('b968edce-1541-4003-a09e-3a670becec2d', '812346685705');
    //      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    //      this.oneSignal.getIds().then((id) => {
    //        console.log(id.userId);
    //        localStorage.setItem("player_id", id.userId);
    //      });
    //      //this.oneSignal.setSubscription(true);
    //      this.oneSignal.handleNotificationReceived().subscribe((data) => {
    //      // handle received here how you wish.
    //      }); 
    //      this.oneSignal.handleNotificationOpened().subscribe((result) => { 
    //       this.assignPush = JSON.stringify(result.notification.isAppInFocus);
    //       this.getPushData = result.notification.payload.additionalData;
    //       localStorage.setItem("action", this.assignPush);
    //       if(localStorage.getItem("action") == 'false'){
    //       }else{
    //         console.log('focus',result)
    //         localStorage.setItem("noti_page", this.getPushData.action);
    //         if(this.getPushData.value!=undefined || this.getPushData.value!=null){
    //           localStorage.setItem("ViewDetails", this.getPushData.value.id);
    //           localStorage.setItem("noti_genre_id", this.getPushData.value.genre.id);
    //           localStorage.setItem("noti_genre_type", this.getPushData.value.genre.genre_type);
    //           if(localStorage.getItem("noti_page")=="home"){ 
    //            this.nav.setRoot('TabsPage',{tabIndex:0}) 
    //           }else{
    //            this.nav.setRoot('TabsPage',{tabIndex:3}) 
    //           }
    //         }else if(localStorage.getItem("noti_page")=="home"){
    //           this.nav.setRoot('TabsPage',{tabIndex:0}) 
    //         }else{
    //           this.nav.setRoot('TabsPage',{tabIndex:3})  
    //         }
    //       }   
    //      });
    //      this.oneSignal.endInit();       
    // }
    SearchPage.prototype.cancelSearch = function () {
        this.navCtrl.pop();
    };
    SearchPage.prototype.onEnter = function (e) {
        if (e.keyCode == 13) {
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
    SearchPage.prototype.openModal = function (user, rank) {
        var _this = this;
        if (this.global.network_status == 2) {
            localStorage.setItem("ViewDetails", user);
            localStorage.setItem("rank", rank);
            var data = { message: 'hello world' };
            var modalPage = this.modalCtrl.create('ModalPage', data);
            modalPage.present();
            localStorage.setItem("pageNav", this.navCtrl.last().name);
            modalPage.onDidDismiss(function () {
                _this.platform.ready().then(function () {
                    _this.platform.registerBackButtonAction(function () {
                        _this.navCtrl.pop();
                    }, 0);
                    //this.triggerNotification();
                });
            });
        }
        else {
            this.SearchOrder = [];
            this.network_status = 1;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], SearchPage.prototype, "myInput", void 0);
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/search/search.html"*/'<ion-header>\n   <ion-toolbar color="dark-blue">\n      <div class="searchgroup">\n        <button ion-button clear icon-only (click)="cancelSearch()">\n          <ion-icon name=\'arrow-back\'></ion-icon>\n        </button>\n        <ion-input #myInput [(ngModel)]="someValue"  (ngModelChange)="keywords_list()"  (keyup.enter)="onEnter($event)"  type="text" class="searchinput" placeholder="Search"></ion-input> \n      </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n<div *ngIf="display_details == 1">\n  <ion-list>\n    <div class="user_list search_list" *ngFor="let sk of Search_keywords">\n      <button ion-item (click)="keywords_details(sk)">\n        <h2>\n          {{sk}}\n          <ion-icon name=\'search\'></ion-icon>\n        </h2>\n      </button> \n    </div>\n  </ion-list>\n</div>\n\n<div *ngIf="display_details == 2">\n  <ion-list>\n    <div class="user_list" *ngFor="let user of SearchOrder">\n      <button ion-item (click)="openModal(user.id,user.rank)">\n        <ion-avatar item-start>\n          <img src="assets/imgs/contactIcon.png" *ngIf="user.user.image.length==0 || user.user.image[0].image_path.url==null">\n          <img src="{{global.imageUrl}}{{user.user.image[0].image_path.url}}" *ngIf="user.user.image.length!=0 && user.user.image[0].image_path.url!=null">\n        </ion-avatar>\n        <h2>{{user.title}}</h2>\n        <p><span><ion-icon name="ios-person-outline"></ion-icon>{{user.user.first_name}}</span><span><ion-icon name="ios-star-outline"></ion-icon>{{user.votes.length}} votes</span><span><ion-icon name="ios-trophy-outline"></ion-icon>Rank {{user.rank}}</span></p>\n      </button> \n    </div>\n  </ion-list>\n</div>\n\n<div *ngIf="display_details == 3">\n    <div class="no_matches" *ngIf="SearchOrder.length == 0 && network_status == 2">\n      <img src="assets/imgs/no_matches.png">\n      <h5>No matches found</h5>\n      <p>please try searching with another term</p>\n    </div>\n</div>    \n\n<div class="find_favourite" *ngIf="display_details == 0 && network_status == 2">\n    <img src="assets/imgs/find.png">\n    <h5>Find your favourite</h5>\n    <p>Search for music, video, etc.,</p>\n</div>\n\n<div class="no_internet1" *ngIf="network_status == 1">\n    <img src="assets/imgs/no_internet.png">\n    <h5>Oops!!</h5>\n    <p> Sorry, we can’t reach the server,<br> Please check your internet connection</p>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_search_search__["a" /* SearchProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_onesignal__["a" /* OneSignal */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ })

});
//# sourceMappingURL=4.js.map