var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HockeyApp } from 'ionic-hockeyapp';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal';
import { MyApp } from './app.component';
import { ScrollHideDirective } from './scroll-hide';
import { LoginPage } from '../pages/login/login';
//import { SearchPage } from '../pages/search/search';
//import { HomePage } from '../pages/home/home';
//import { HistoryPage } from '../pages/history/history';
import { LoginPageModule } from '../pages/login/login.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { HomePageModule } from '../pages/home/home.module';
import { UploadPageModule } from '../pages/upload/upload.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { MyvotesPageModule } from '../pages/myvotes/myvotes.module';
import { HistoryPageModule } from '../pages/history/history.module';
import { Keyboard } from '@ionic-native/keyboard';
import { Toast } from '@ionic-native/toast';
import { Media } from '@ionic-native/media';
import { MediaCapture } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from "@ionic-native/file-path";
import { FileTransfer } from '@ionic-native/file-transfer';
import { VideoEditor } from '@ionic-native/video-editor';
//import { IOSFilePicker } from '@ionic-native/file-picker';
import { HomeProvider } from '../providers/home/home';
import { ViewProvider } from '../providers/view/view';
import { VotesProvider } from '../providers/myvotes/myvotes';
import { HistoryProvider } from '../providers/history/history';
import { LoginProvider } from '../providers/login/login';
import { SignupProvider } from '../providers/signup/signup';
import { ChangepasswordProvider } from '../providers/changepassword/changepassword';
import { ForgotpasswordProvider } from '../providers/forgotpassword/forgotpassword';
import { Globals } from '../providers/global';
import { SearchProvider } from '../providers/search/search';
import { UploadProvider } from '../providers/upload/upload';
import { NotificationProvider } from '../providers/notification/notification';
import { Network } from '@ionic-native/network';
import { Slides } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Deeplinks } from '@ionic-native/deeplinks';
import { DatePipe } from '@angular/common';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { StreamingMedia } from '@ionic-native/streaming-media';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                ScrollHideDirective
            ],
            imports: [
                HttpModule,
                BrowserModule,
                IonicModule.forRoot(MyApp, {
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    menuType: 'overlay',
                    pageTransition: 'ios-transition'
                }),
                LoginPageModule,
                MenuPageModule,
                HomePageModule,
                UploadPageModule,
                NotificationPageModule,
                HttpClientModule,
                HistoryPageModule,
                MyvotesPageModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                LoginPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                HockeyApp,
                Globals,
                VotesProvider,
                HistoryProvider,
                HomeProvider,
                ViewProvider,
                LoginProvider,
                SignupProvider,
                ChangepasswordProvider,
                ForgotpasswordProvider,
                SearchProvider,
                Keyboard,
                Toast,
                SocialSharing,
                MediaCapture,
                Media,
                ImagePicker,
                Base64,
                OneSignal,
                File,
                FileChooser,
                //IOSFilePicker,
                FilePath,
                FileTransfer,
                VideoEditor,
                UploadProvider,
                NotificationProvider,
                Network,
                Slides,
                GooglePlus,
                Facebook,
                Deeplinks,
                DatePipe,
                AndroidPermissions,
                StreamingMedia
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map