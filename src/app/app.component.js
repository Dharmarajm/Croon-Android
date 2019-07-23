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
import { Platform, App, AlertController, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HockeyApp } from 'ionic-hockeyapp';
import { MenuPage } from '../pages/menu/menu';
import { Globals } from '../providers/global';
import { Network } from '@ionic-native/network';
import { Deeplinks } from '@ionic-native/deeplinks';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, hockeyapp, app, alertCtrl, global, network, deeplinks, androidPermissions, toast, file) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.network = network;
        this.deeplinks = deeplinks;
        this.androidPermissions = androidPermissions;
        this.toast = toast;
        this.file = file;
        this.rootPage = MenuPage;
        this.counter = 0;
        platform.ready().then(function () {
            _this.deeplinks.routeWithNavController(_this.nav, {
                '/hats/:hatId': MenuPage
            }).subscribe(function (match) {
            }, function (nomatch) {
            });
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
            var androidAppId = '3f6000180b044597b1f44364fef8b3a0';
            // The iOS ID of the app as provided by the HockeyApp portal. Can be null if for android only.
            var iosAppId = 'cdbaa6ede0d94964bb6c443bd2accce3';
            // Specifies whether you would like crash reports to be automatically sent to the HockeyApp server when the end user restarts the app.
            var autoSendCrashReports = false;
            // Specifies whether you would like to display the standard dialog when the app is about to crash. This parameter is only relevant on Android.
            var ignoreCrashDialog = true;
            hockeyapp.start(androidAppId, iosAppId, autoSendCrashReports, ignoreCrashDialog);
            androidPermissions.requestPermissions([
                androidPermissions.PERMISSION.CAMERA,
                //androidPermissions.PERMISSION.CALL_PHONE, 
                //androidPermissions.PERMISSION.GET_ACCOUNTS, 
                androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
            ]);
            /*window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
              dir.getFile("log.txt", {create:true}, function(file) {
                  var logOb = file;
                  var log = ":: TEST LOG ::" + " [" + (new Date()) + "]\n";
                  logOb.createWriter(function(fileWriter) {
                      fileWriter.seek(fileWriter.length);
                      var blob = new Blob([log], {type:'text/plain'});
                      fileWriter.write(blob);
                  }, function(e){console.error(e);});
              });
            });*/
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
        ViewChild('myNav'),
        __metadata("design:type", NavController)
    ], MyApp.prototype, "nav", void 0);
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "naV", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, HockeyApp, App, AlertController, Globals, Network, Deeplinks, AndroidPermissions, Toast, File])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map