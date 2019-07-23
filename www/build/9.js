webpackJsonp([9],{

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioModalPageModule", function() { return AudioModalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_modal__ = __webpack_require__(335);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AudioModalPageModule = /** @class */ (function () {
    function AudioModalPageModule() {
    }
    AudioModalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__audio_modal__["a" /* AudioModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__audio_modal__["a" /* AudioModalPage */]),
            ],
        })
    ], AudioModalPageModule);
    return AudioModalPageModule;
}());

//# sourceMappingURL=audio-modal.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_media__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AudioModalPage = /** @class */ (function () {
    function AudioModalPage(navCtrl, navParams, viewCtrl, media, file, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.media = media;
        this.file = file;
        this.platform = platform;
        this.recording = false;
        this.audioList = [];
        this.sec = 0;
        this.time = "00:00:00";
        this.isenabled = true;
        this.audioTrack = false;
        this.recordStart = false;
        this.Stop = false;
        this.Pause = false;
        this.show = 3;
        platform.registerBackButtonAction(function () {
            _this.viewCtrl.dismiss();
        }, 0);
    }
    AudioModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AudioModalPage');
    };
    AudioModalPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    AudioModalPage.prototype.getAudioList = function () {
        if (localStorage.getItem("audiolist")) {
            this.audioList = JSON.parse(localStorage.getItem("audiolist"));
        }
    };
    AudioModalPage.prototype.ionViewWillEnter = function () {
        this.getAudioList();
    };
    AudioModalPage.prototype.playAudio = function (file, idx) {
        if (this.platform.is('ios')) {
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
            this.audio = this.media.create(this.filePath);
        }
        else if (this.platform.is('android')) {
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
            this.audio = this.media.create(this.filePath);
        }
        this.audio.play();
        this.audio.setVolume(1.0);
        //this.audio.setRate(2.0)
    };
    AudioModalPage.prototype.secondsToTime = function (secs) {
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        if (seconds < 10) {
            this.zero = "0" + seconds;
            seconds = this.zero;
        }
        if (minutes < 10) {
            this.zero = "0" + minutes;
            minutes = this.zero;
        }
        if (hours < 10) {
            this.zero = "0" + hours;
            hours = this.zero;
        }
        var obj = hours + ":" + minutes + ":" + seconds;
        return obj;
    };
    AudioModalPage.prototype.start = function () {
        var _this = this;
        /* if (this.platform.is('ios')) {
             this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
               this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
               this.audio = this.media.create(this.filePath);
         } else if (this.platform.is('android')) {
             this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
               this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
               this.audio = this.media.create(this.filePath);
         }*/
        if (this.audioTrack == false && this.recordStart == false) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
            this.file.createFile(this.file.externalDataDirectory, this.fileName, true).then(function () {
                _this.filePath = _this.file.externalDataDirectory.replace(/file:\/\//g, '') + _this.fileName;
                _this.audio = _this.media.create(_this.filePath);
                _this.audioTrack = true;
                _this.Stop = true;
                _this.Pause = true;
                _this.audio.startRecord();
                _this.audio.onSuccess.subscribe(function () { return console.log('Action is successful'); });
                _this.audio.onError.subscribe(function (error) { return console.log('Error!', error); });
                _this.recording = true;
                _this.show = 1;
                //this.isenabled=false; 
                _this.time = "00:00:00";
                _this.sec = 0;
                _this.interval = setInterval(function () {
                    _this.sec += 1;
                    _this.time = _this.secondsToTime(_this.sec);
                }, 1000);
                _this.recording = true;
            }).catch(function (e) { return console.log(e); });
        }
        else {
            if (this.recordStart == false) {
                this.audioTrack = false;
                this.Pause = false;
                this.recordStart = true;
                this.audio.pauseRecord();
                clearInterval(this.interval);
            }
            else {
                this.audioTrack = true;
                this.recordStart = false;
                this.Pause = true;
                this.audio.resumeRecord();
                this.interval = setInterval(function () {
                    _this.sec += 1;
                    _this.time = _this.secondsToTime(_this.sec);
                }, 1000);
            }
        }
    };
    AudioModalPage.prototype.stop = function () {
        this.isenabled = false;
        this.Stop = false;
        this.show = 2;
        clearInterval(this.interval);
        this.audio.stopRecord();
        this.audio.release();
        /*let data = { filename: this.fileName };
        this.audioList.push(data);
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();      */
    };
    AudioModalPage.prototype.confirm = function () {
        /*let data = { filename: this.fileName };
        this.audioList.push(data);
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();  */
        localStorage.setItem("audiolist", JSON.stringify(this.filePath));
        localStorage.setItem("fileNameaudio", JSON.stringify(this.fileName));
        this.viewCtrl.dismiss();
    };
    AudioModalPage.prototype.startRecord = function () {
        if (this.platform.is('ios')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        else if (this.platform.is('android')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        this.audio.startRecord();
        this.recording = true;
    };
    AudioModalPage.prototype.stopRecord = function () {
        this.audio.stopRecord();
        var data = { filename: this.fileName };
        this.audioList.push(data);
        localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        this.getAudioList();
    };
    AudioModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-audio-modal',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/audio-modal/audio-modal.html"*/'<ion-content class="back_content">\n\n   <!--  <button ion-button icon-only clear (click)="closeModal()">\n      <ion-icon name="ios-arrow-round-back" style="margin-top: 15px;color:white"></ion-icon>\n    </button> -->\n\n    <p class="timer">{{time}}</p>\n\n   <!--  <br><br><br><br><br><br><br><br><br><br>\n\n    <div class="row row-center" (click)="start()" *ngIf="show == 3" >\n        <div class="col text-center" >\n            <img alt="Logo" height="100" src="assets/imgs/record_button.png">\n        </div>\n    </div> -->\n\n  <!--   <br><br>\n	<button ion-button primary *ngIf="show == 1" (click)="stop()">stop</button>\n	<button ion-button primary *ngIf="show == 2" (click)="conform()">conform</button> -->\n  <div class="row" style="margin-top: 75% !important;margin-left: 20px;">\n      <div class="btn-label" id="upload_record" >\n        <button ion-button icon-only [disabled]="!isenabled" (click)="start()">\n          <ion-icon name="ios-mic-outline" *ngIf="!Pause"></ion-icon> \n          <ion-icon name="ios-pause-outline" *ngIf="Pause"></ion-icon>\n        </button>\n        <p *ngIf="!Pause">Record</p>\n        <p *ngIf="Pause">Pause</p>\n      </div>\n\n      <div class="btn-label" id="upload_record" >\n        <button ion-button icon-only style="font-size: 13px;background: #ece2e2de;color: black;" [disabled]="!Stop" (click)="stop()">\n           <ion-icon name="square-outline"></ion-icon>\n          <!-- <ion-icon name="mic"></ion-icon> -->\n        </button>\n        <p>Stop</p>\n      </div>\n\n      <div class="btn-label" id="upload_record" (click)="confirm()">\n        <button ion-button icon-only [disabled]="isenabled">\n          <ion-icon name="ios-checkmark-circle-outline"></ion-icon>\n        </button>\n        <p>Confirm</p>\n      </div>\n  </div>\n  <!-- <button ion-button primary (click)="playAudio(fileName)">play</button>\n  <ion-card>\n    <ion-card-content>\n      <ion-card-title>\n        <button ion-button primary (click)="stopRecord()" *ngIf="recording"><ion-icon name="mic-off"></ion-icon>&nbsp;&nbsp;Stop Record</button>\n        <button ion-button primary (click)="startRecord()" *ngIf="!recording"><ion-icon name="mic"></ion-icon>&nbsp;&nbsp;Start Record</button>\n      </ion-card-title>\n    </ion-card-content>\n  </ion-card>\n  <ion-list>\n    <ion-item *ngFor="let audio of audioList; index as i;">\n      <p>{{audio.filename}}</p>\n      <button ion-button clear item-end large (click)="playAudio(audio.filename, i)"><ion-icon name="play"></ion-icon></button>\n    </ion-item>\n  </ion-list> -->\n</ion-content> '/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/audio-modal/audio-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_media__["a" /* Media */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */]])
    ], AudioModalPage);
    return AudioModalPage;
}());

//# sourceMappingURL=audio-modal.js.map

/***/ })

});
//# sourceMappingURL=9.js.map