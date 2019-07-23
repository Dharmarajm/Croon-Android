webpackJsonp([0],{

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsPageModule", function() { return TermsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__terms__ = __webpack_require__(343);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TermsPageModule = /** @class */ (function () {
    function TermsPageModule() {
    }
    TermsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__terms__["a" /* TermsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__terms__["a" /* TermsPage */]),
            ],
        })
    ], TermsPageModule);
    return TermsPageModule;
}());

//# sourceMappingURL=terms.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_signup_signup__ = __webpack_require__(232);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { TermsPage } from './../terms/terms';
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, service, loadingCtrl, platform, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.signup = { emailid: '', password: '', confrim: '' };
        platform.registerBackButtonAction(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        }, 0);
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        window.setTimeout(function () {
            _this.myInput.setFocus();
        }, 600);
    };
    SignupPage.prototype.back = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    SignupPage.prototype.gotologin = function () {
        var email_validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.signup.emailid == '' || this.signup.emailid == null) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the Email-ID",
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else if (!email_validation.test(this.signup.emailid)) {
            var alert_2 = this.alertCtrl.create({
                title: "Croon",
                message: "Invalid Email-ID",
                buttons: ['Ok']
            });
            alert_2.present();
        }
        else if (this.signup.password == '' || this.signup.password == null) {
            var alert_3 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the password",
                buttons: ['Ok']
            });
            alert_3.present();
        }
        else if (this.signup.password.length < 5) {
            var alert_4 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the minmum 5 character in password field",
                buttons: ['Ok']
            });
            alert_4.present();
        }
        else if (this.signup.confrim == '' || this.signup.confrim == null) {
            var alert_5 = this.alertCtrl.create({
                title: "Croon",
                message: "Please enter the confirm password",
                buttons: ['Ok']
            });
            alert_5.present();
        }
        else if (this.signup.password != this.signup.confrim) {
            this.signup.password = '';
            this.signup.confrim = '';
            var alert_6 = this.alertCtrl.create({
                title: "Croon",
                message: "Passwords do not match",
                buttons: ['Ok']
            });
            alert_6.present();
        }
        else {
            localStorage.setItem("email_id_signup", this.signup.emailid);
            localStorage.setItem("password_signup", this.signup.password);
            this.navCtrl.setRoot('TermsPage');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myInput'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "myInput", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/signup/signup.html"*/'<ion-content class="ion-content">\n  <div class="header">\n    <span>\n      <button ion-button icon-only clear id="signup_back_button" (click)="back()">\n       <ion-icon name="ios-arrow-back"></ion-icon>\n      </button>\n      <h4>Signup</h4>\n    </span>\n    <img src="assets/imgs/logo.png">\n  </div>\n  <form class="login-form">\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" id="signup_emailid" #myInput [(ngModel)]="signup.emailid" [ngModelOptions]="{standalone: true}" autofocus></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" minlength="5" maxlength="10" id="signup_password" [(ngModel)]="signup.password" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Confirm Password</ion-label>\n      <ion-input type="password" id="signup_confirm_password" [(ngModel)]="signup.confrim" [ngModelOptions]="{standalone: true}"></ion-input>\n    </ion-item>\n    <br>\n\n    <button ion-button block id="signup_save_button" (click)="gotologin()">Next</button> \n   \n</form>\n</ion-content>\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_signup_signup__["a" /* SignupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_signup_signup__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(333);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



var TermsPage = /** @class */ (function () {
    function TermsPage(navCtrl, navParams, service, loadingCtrl, platform, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.signup = { emailid: '', password: '' };
    }
    TermsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
        this.signup.emailid = localStorage.getItem("email_id_signup");
        this.signup.password = localStorage.getItem("password_signup");
    };
    TermsPage.prototype.back = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    TermsPage.prototype.terms = function (check_values) {
        this.check_terms = check_values;
    };
    TermsPage.prototype.gotologin_final = function () {
        var _this = this;
        if (this.check_terms == false || this.check_terms == '' || this.check_terms == undefined) {
            var alert_1 = this.alertCtrl.create({
                title: "Croon",
                message: "Please select the terms and conditions",
                buttons: ['Ok']
            });
            alert_1.present();
        }
        else if (this.check_terms == true) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.service.signup(this.signup.emailid.toLowerCase(), this.signup.password)
                .subscribe(function (res) {
                loading_1.dismiss();
                _this.signup_details = res;
                if (_this.signup_details == true) {
                    var toast = _this.toastCtrl.create({
                        message: 'Your registration completed!',
                        duration: 2000,
                        position: 'bottom'
                    });
                    toast.present();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: "Croon",
                        message: "This email already exists",
                        buttons: ['Ok']
                    });
                    alert_2.present();
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
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terms',template:/*ion-inline-start:"/home/it/HSENGIV/CROON-ANDROID/src/pages/terms/terms.html"*/'<ion-content class="ion-content">\n  <div class="header">\n    <span>\n      <button ion-button icon-only clear (click)="back()">\n       <ion-icon name="ios-arrow-back"></ion-icon>\n      </button>\n      <h4>Terms</h4>\n    </span>\n    <img src="assets/imgs/logo.png">\n  </div>\n  <div class="terms-conditions">\n    <h4>Croon L.L.C. Terms of Service</h4>\n\n    These Croon L.L.C. Terms of Service (the “Terms”) are a legal contract between you and Croon L.L.C.  (“Croon”, “we” or “us”).  These Terms explain how you are permitted to use the Croon mobile application and services, as well as the Croon website (the “Site”) and any content therein (collectively, the “Services”).  Unless otherwise specified, all references to the Services include the services available through the Croon mobile application (the “App”) and the Site, as well as any software that Croon provides to you that allows you to access the Services from a mobile device.  By using the Services, you are agreeing to all of the Terms; if you do not agree with any of these Terms, do not access or otherwise use the Services. \n\n    <h4>Changes</h4>\n\n    Croon may make changes to the Services at any time.  Croon can change, update, or add or remove provisions of these Terms at any time by posting the updated Terms on the App or the Site, by posting a notice on the Services or by notifying you via the App.  By using the Services after Croon has updated the Terms, you are agreeing to all the updated Terms; if you do not agree with any of the updated Terms, you must stop using Services.\n\n    <h4>General Use</h4>\n\n    By using, you represent, acknowledge and agree that you are at least 18 years of age.  If you are not at least 13 years old, you may not use the Services at any time or in any manner or submit any information to the App, the Site or any part of the Services.\n\n    You represent andwrrant that \n     <ol type="I">\n     <li>you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country; and</li>\n     <li>You are not listed on any U.S. Government list of prohibited or restricted parties.</li>\n     </ol>\n\n    We may, in our sole discretion, refuse to offer the Services to any person or entity.  We may, without notice and in our sole discretion, terminate your right to use the Services, or any portion thereof, and block or prevent your future access to and use of the Services or any portion thereof.\n\n    <h4>Services</h4>\n\n    Croon does not warrant that the Services will meet your requirements, that defects in the Services will be corrected or that any requests you might have to the Services will be implemented. Further, Croon does not warrant that the Service will be available at any given time. Croon does not warrant that your use of the Service will be uninterrupted, secure, timely or free from error.\n\n    Croon has the right to close down the Services at any time without prior notice. Croon has no obligation to provide you with any information if the Services are shut down or temporary unavailable. Croon will make its best effort to inform about planned unavailability to the Services, but is not obligated to do so.\n\n    You may use the App for your personal, non-commercial use.  You may not:\n     <ol type="I">\n     <li> modify, disassemble, decompile or reverse engineer the App, except to the extent that such restriction is expressly prohibited by law;</li>\n     <li> rent, lease, loan, resell, sublicense, distribute or otherwise transfer the App to any third-party; </li>\n     <li> make any copies of the App;</li>\n     <li> remove, circumvent, disable, damage or otherwise interfere with security-related features of the App; or\n     </li>\n     <li> delete the copyright and other proprietary rights notices on the App.  You acknowledge that Croon may from time to time issue upgraded versions of the App, and may automatically electronically upgrade the version of the App that you are using on your mobile device.  You consent to such automatic upgrading on your mobile device, and agree that these Terms will apply to all such upgrades.  Standard carrier data charges may apply to your use of the App.\n     </li>\n     </ol>\n\n    Except for the limited rights expressly licensed in these Terms, Croon retains all right, title, and interest in and to the Services.\n\n    If you breach any of these Terms, the above license will terminate automatically and you must immediately stop using the Services.\n\n\n    <h4>Submissions</h4>\n\n    You are responsible for any information, opinions, messages, comments, photos, videos, graphics, sounds and other content or material that you submit, upload, post or otherwise make available on, through or in connection with the Services (each a “Submission”).  We reserve the right to retain your Submissions, even after they have expired from view within the App or even after you have deleted them.  However, you agree that we have no obligation to retain any Submission for any period of time, nor shall we be responsible or liable to you or any third party for any lost content or losses related to the expiration or deletion of a Submission.\n\n    You may not upload, post or otherwise make available on the Services any material protected by copyright, trademark, or any other proprietary right without the express permission of the owner of such copyright, trademark or other proprietary right owned by a third party, and the burden of determining whether any material is protected by any such right is on you.  You shall be solely liable for any damage or harm resulting from any Submission that you make.  You have full responsibility for each Submission you make, including its legality, reliability and appropriateness.\n\n    You expressly acknowledge that any content or other information you submit to the Services may be viewable by all other users of the Services and any third party.  You agree that any Submission provided by you in connection with the Services is provided on a non-proprietary and non-confidential basis.  \n\n    You agree to pay for all royalties, fees, damages and any other monies owing any person by reason of any Submissions posted by you to or through the Services. When you provide Submissions you agree that those Submissions shall not be in violation of the “Unauthorized Activities” section below.  Although Croon may, in its sole discretion, monitor and remove or edit Submissions for any reason, including but not limited to violation of the “Unauthorized Activities” section below, Croon is not obligated to do so.\n\n\n\n    <h4>Unauthorized Activities</h4>\n\n    When using the App and/or any other part of the Services, you agree not to:\n    <ul>\n       <li> Defame, abuse, harass, stalk, threaten, or otherwise violate the legal rights (such as rights of privacy and publicity) of others.</li>\n      <li>  Use racially or ethnically offensive language.</li>\n      <li> Discuss or incite illegal activity.</li>\n      <li>  Post anything that exploits children or minors (including pornography that depicts minors) or that depicts cruelty to animals.</li>\n       <li>Post any copyrighted or trademarked materials without the express permission from the owner.</li>\n       <li>Disseminate any unsolicited or unauthorized advertising, promotional materials, ‘junk mail’, ‘spam’, ‘chain letters’, ‘pyramid schemes’, or any other form of such solicitation.</li>\n       <li> Use any robot, spider, scraper or other automated means to access the Services.</li>\n       <li> Take any action that imposes an unreasonable or disproportionately large load on our infrastructure.</li>\n      <li>  Alter the opinions or comments posted by others on the Services</li>\n        <li>Post any image or language that is obscene or offensive, threatening or demeaning to any individual or group.</li>\n      <li>  Post anything contrary to our public image, goodwill or reputation.</li>\n    </ul>\n    This list of prohibitions provides examples and is not exhaustive or exclusive.  \n    Croon reserves the right to <ol type="a"><li>terminate access to your account and your ability to post to the Services (or otherwise use the Services) and/or</li><li>  refuse, delete or remove any Submissions; with or without cause and with or without notice, for any reason or no reason, or for any action that Croon determines is inappropriate or disruptive to the Services or to any other user of the Services.  <b>Croon may report to law enforcement authorities any actions that may be illegal, and any reports it receives of such conduct.  When legally required or at Croon’s discretion, Croon will cooperate with law enforcement agencies in any investigation of alleged illegal activity on the Services or on the Internet.</b></li></ol>\n\n    You agree to indemnify and hold Croon and its officers, directors, employees, consultants, affiliates, agents, and business partners (collectively, the “Indemnified Entities”) harmless from and against any and all costs, damages, liabilities, and expenses (including attorneys’ fees and costs of defense) Croon or any other Indemnified Entity suffers in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party that your use of the Services or the use of the Services by any person using your user name and/or password (including without limitation, your participation in the posting areas or, your Submissions) violates any applicable law or regulation, or the copyrights, trademark rights or other rights of any third party.\n\n    <h4>Disclaimer of Warranties</h4>\n\n    Your use of the Services is at your own risk.  Content posted by other users may not have been verified or authenticated in whole or in part by Croon, and they may include inaccuracies or typographical or other errors.  Croon does not warrant the accuracy of timeliness of the any content contained on the Services.  Croon has no liability for any loss of, or errors or omissions in Submissions, or for any errors or omissions in the content or any other portion of the Services, whether provided by Croon, or suppliers or other users.\n\n    CROON, MAKES NO EXPRESS, IMPLIED OR STATUTORY REPRESENTATIONS, WARRANTIES, OR GUARANTEES IN CONNECTION WITH THE SERVICES OR ANY CONTENT RELATING TO THE QUALITY, SUITABILITY, TRUTH, ACCURACY OR COMPLETENESS OF ANY INFORMATION OR MATERIAL CONTAINED OR PRESENTED ON THE SERVICES.  UNLESS OTHERWISE EXPLICITLY STATED, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES, CONTENT AND ANY OTHER PORTION OF THE SERVICES OR ANY INFORMATION OR MATERIAL CONTAINED OR PRESENTED ON THE SERVICES IS PROVIDED TO YOU ON AN “AS IS,” “AS AVAILABLE” BASIS WITH NO WARRANTY OF IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF THIRD PARTY RIGHTS.  WITHOUT LIMITING THE FOREGOING, CROON DOES NOT PROVIDE ANY WARRANTIES AGAINST VIRUSES, SPYWARE OR MALWARE THAT MAY BE INSTALLED ON YOUR COMPUTER.\n    <h4>Limitation of Liability</h4>\n\n    IN NO EVENT WILL CROON BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES EVEN IF CROON HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.  WITHOUT LIMITING THE FOREGOING, CROON SHALL NOT BE LIABLE TO YOU FOR ANY DAMAGES RESULTING FROM YOUR DISPLAYING, COPYING, OR DOWNLOADING ANY CONTENT TO OR FROM THE SERVICES.\n\n    YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE SERVICES.  YOUR ONLY REMEDY AGAINST CROON FOR DISSATISFACTION WITH THE SERVICES IS TO STOP USING THE SERVICES.  IF, NOTWITHSTANDING THESE TERMS, CROON IS FOUND LIABLE TO YOU FOR ANY DAMAGE OR LOSS THAT ARISES OUT OF OR IS IN ANY WAY CONNECTED WITH YOUR USE OF THE SERVICES, CROON’S LIABILITY SHALL IN NO EVENT EXCEED ONE U.S. DOLLAR ($1.00) IN THE AGGREGATE.\n\n    THE FOREGOING EXCLUSIONS AND LIMITATIONS SHALL APPLY TO THE EXTENT PERMITTED BY LAW.  SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS OF LIABILITY, SO THE FOREGOING EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.\n    <h4>Local Laws; Export Control</h4>\n    Croon controls and operates the Services from its headquarters in the United States and the Services may not be appropriate for use in other locations.  You are responsible for following applicable laws and regulations in your jurisdiction, including but not limited to laws and regulations regarding the transmission of technical data exported from the United States or the country in which you reside.\n\n    <h4>Feedback</h4>\n\n    If you send or transmit any communications, comments, questions, suggestions, or related materials regarding Croon or the Services, whether by email or otherwise (collectively, “Feedback”), such Feedback is, and will be treated as, non-confidential and non-proprietary.  You hereby assign all right, title, and interest in, and Croon is free to use, without any attribution or compensation to you, any and all Feedback for any purpose whatsoever.  You understand and agree that Croon is not obligated to use, display, reproduce, or distribute any such ideas, know-how, concepts, or techniques contained in the Feedback, and you have no right to compel such use, display, reproduction, or distribution.\n    <h4>Dispute Resolution and Arbitration; Class Action Waiver</h4>\n\n    <b>Please read the following provision (the “Provision”) carefully; it requires you to arbitrate disputes with Croon and otherwise limits the ways you can seek remedies from us.</b>  \n\n    Many customer concerns can be resolved quickly and to a customer’s satisfaction by contacting us at <a> admin@croonapp.com</a>.  We ask that you please contact us if you have any concerns.\n    <br><br>\n    This Provision facilitates the prompt and efficient resolution of any disputes that may arise between you and Croon.  Arbitration is a form of private dispute resolution in which persons with a dispute waive their rights to file a lawsuit, to proceed in court and to a jury trial, and instead submit their disputes to a neutral third person (or arbitrator) for a binding decision.  You have the right to opt out of this Provision (as explained below), which means you would retain your right to litigate your disputes in a court, either before a judge or jury.\n    <br><br>\n    This provision provides that all Disputes between you and Croon shall be resolved by binding arbitration.  Arbitration replaces the right to go to court.  In the absence of this arbitration agreement, you may otherwise have a right or opportunity to bring claims in a court, before a judge or jury, and/or to participate in or be represented in a case filed in court by others (including, but not limited to, class actions).  Except as otherwise provided, entering into this agreement constitutes a waiver of your right to litigate claims and all opportunity to be heard by a judge or jury.  There is no judge or jury in arbitration, and court review of an arbitration award is limited.  The arbitrator must follow this agreement and can award the same damages and relief as a court (including attorney’s fees).\n    <br><br>\n    For the purpose of this Provision, “Croon” means Croon and its parents, subsidiary, and affiliate companies, and each of their respective officers, directors, employees, contractors and agents.  The term “Dispute” means any dispute, claim, or controversy between you and Croon regarding any aspect of your relationship with Croon, whether based in contract, statute, regulation, ordinance, tort (including, but not limited to, fraud, misrepresentation, fraudulent inducement, or negligence), or any other legal or equitable theory, and includes the validity, enforceability or scope of this Provision (with the exception of the enforceability of the Class Action Waiver clause below).\n    <br><br>\n    WE EACH AGREE THAT, EXCEPT AS PROVIDED BELOW, ANY AND ALL DISPUTES, AS DEFINED ABOVE, WHETHER PRESENTLY IN EXISTENCE OR BASED ON ACTS OR OMISSIONS IN THE PAST OR IN THE FUTURE, WILL BE RESOLVED EXCLUSIVELY AND FINALLY BY BINDING ARBITRATION RATHER THAN IN COURT IN ACCORDANCE WITH THIS PROVISION.\n    <br><br>\n    <u>Pre-Arbitration Claim Resolution</u>\n    <br>\n\n    For all Disputes, whether pursued in court or arbitration, you must first give Croon an opportunity to resolve the Dispute.  You must commence this process by mailing written notification to Croon.<br>  That written notification must include <ol type="1"><li>your name,</li>\n    <li>your address,</li>\n    <li>a written description of your Claim, and</li>\n    <li>a description of the specific relief you seek.  If Croon does not resolve the Dispute within 45 days after it receives your written notification, you may pursue your Dispute in arbitration.  You may pursue your Dispute in a court only under the circumstances described below.</li>\n    </ol>\n\n    <h4>Exclusions from Arbitration/Right to Opt Out</h4>\n\n    Notwithstanding the above, you or Croon may choose to pursue a Dispute in court and not by arbitration if <ol type="a">\n    <li> given the nature and amount of the Dispute, it may be initiated in small claims court; or</li>\n    <li> YOU OPT OUT OF THESE ARBITRATION PROCEDURES WITHIN 30 DAYS FROM THE DATE THAT YOU FIRST CONSENT TO THIS AGREEMENT (the “Opt-Out Deadline”).  You may opt out of this Provision by mailing written notification to Croon.</li>\n    </ol>\n    Your written notification must include <ol type="1"> \n    <li> your name,</li>\n    <li> your address, and </li>\n    <li> a clear statement that you do not wish to resolve disputes with Croon through arbitration.  Your decision to opt out of this Arbitration Provision will have no adverse effect on your relationship with Croon.<b>  Any opt-out request received after the Opt-Out Deadline will not be valid and you must pursue your Dispute in arbitration or small claims court.</b></li></ol>\n\n    <h4>Arbitration Procedures</h4>\n\n    Arbitration Organization:  If this Provision applies and the Dispute is not resolved as provided above (Pre-Arbitration Claim Resolution) either you or Croon may initiate arbitration proceedings.  The American Arbitration Association (“AAA”), <a href="https://www.adr.org/">www.adr.org</a>, or JAMS,<a href="https://www.jamsadr.com/"> www.jamsadr.com</a>, will arbitrate all Disputes, and the arbitration will be conducted before a single arbitrator.  The arbitration shall be commenced as an individual arbitration, and shall in no event be commenced as a class arbitration.  All issues shall be for the arbitrator to decide, including the scope of this Provision.\n    <br><br>\n    For arbitration before AAA, for Disputes of less than $75,000, the AAA’s Supplementary Procedures for Consumer-Related Disputes will apply; for Disputes involving $75,000 or more, the AAA’s Commercial Arbitration Rules will apply.  In either instance, the AAA’s Optional Rules for Emergency Measures of Protection shall apply.  The AAA rules are available at <a href="https://www.adr.org/">www.adr.org</a> or by calling <a>1-800-778-7879</a>.  For arbitration before JAMS, the JAMS Comprehensive Arbitration Rules & Procedures and the JAMS Recommended Arbitration Discovery Protocols for Domestic, Commercial Cases will apply.  The JAMS rules are available at <a href="https://www.jamsadr.com/">www.jamsadr.com</a> or by calling <a>1-800-352-5267</a>.  This Provision governs in the event it conflicts with the applicable arbitration rules.  Under no circumstances will class action procedures or rules apply to the arbitration.\n    <br><br>\n    Because the Services and these Terms concern interstate commerce, the Federal Arbitration Act (“FAA”) governs the arbitrability of all Disputes.  However, the arbitrator will apply applicable substantive law consistent with the FAA and the applicable statute of limitations or condition precedent to suit.\n    <br><br>\n    Arbitration Award: The arbitrator may award on an individual basis any relief that would be available pursuant to applicable law, and will not have the power to award relief to, against or for the benefit of any person who is not a party to the proceeding.  The arbitrator will make any award in writing but need not provide a statement of reasons unless requested by a party.  Such award will be final and binding on the parties, except for any right of appeal provided by the FAA, and may be entered in any court having jurisdiction over the parties for purposes of enforcement.\n    <br><br>\n    Location of Arbitration: You or Croon may initiate arbitration in the State of New Jersey.\n    <br>\n    <u>Class Action Waiver</u>\n    <br>\n    Except as otherwise provided in this Provision, the arbitrator may not consolidate more than one person’s claims, and may not otherwise preside over any form of a class or representative proceeding or claims (such as a class action, consolidated action or private attorney general action) unless both you and Croon specifically agree to do so following initiation of the arbitration. <b> If you choose to pursue your Dispute in court by opting out of the Arbitration Provision, as specified above, this Class Action Waiver will not apply to you.</b>  Neither you, nor any other user of the Services can be a class representative, class member, or otherwise participate in a class, consolidated, or representative proceeding without having complied with the opt-out requirements above.\n    <br><br>\n    <u>Jury Waiver</u>\n    <br>\n    You understand and agree that by entering into this Agreement you and Croon are each waiving the right to a jury trial or a trial before a judge in a public court.  In the absence of this Provision, you and Croon might otherwise have had a right or opportunity to bring Disputes in a court, before a judge or jury, and/or to participate or be represented in a case filed in court by others (including class actions).  Except as otherwise provided in this Provision, those rights are waived.  Other rights that you would have if you went to court, such as the right to appeal and to certain types of discovery, may be more limited or may also be waived.\n    <br><br>\n    <u>Severability</u>\n    <br>\n    If any clause within this Provision (other than the Class Action Waiver clause above) is found to be illegal or unenforceable, that clause will be severed from this Provision, and the remainder of this Provision will be given full force and effect.  If the Class Action Waiver clause is found to be illegal or unenforceable, this entire Provision will be unenforceable and the Dispute will be decided by a court.\n    <br><br>\n    <h4>General</h4>\n\n    The Federal Arbitration Act, New Jersey state law and applicable U.S. federal law, without regard to the choice or conflicts of law provisions, will govern these Terms.  Foreign laws do not apply.  The United Nations on Contracts for the International Sale of Goods and any laws based on the Uniform Computer Information Transactions Act (UCITA) shall not apply to this Agreement.  Except for Disputes subject to arbitration as described above, any disputes relating to these Terms or the Services will be heard in the courts located in New Jersey.  If any of these Terms is found to be inconsistent with applicable law, then such term shall be interpreted to reflect the intentions of the parties, and no other terms will be modified.  Croon’s failure to enforce any of these Terms is not a waiver of such term.  These Terms are the entire agreement between you and Croon and supersede all prior or contemporaneous negotiations, discussions or agreements between you and Croon about the Services.  The proprietary rights, disclaimer of warranties, representations made by you, indemnities, limitations of liability and general provisions shall survive any termination of these Terms.\n    <br><br>\n\n    <h4>Copyright Policy</h4>\n\n    Croon respects the intellectual property rights of others. If you believe that your intellectual property appears on the Services in violation of your copyright, please provide Croon the following information:\n    <ul>\n       <li> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>\n       <li> Identification of the work claimed to have been infringed, or, if multiple works at a single online site are covered by a single notification, a representative list of such works at that site.</li>\n       <li> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled at the Services, and information reasonably sufficient to permit Croon to locate the material.</li>\n       <li> Information reasonably sufficient to permit Croon to contact you as the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted.</li>\n       <li> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the intellectual property owner, its agent, or the law.</li>\n       <li> A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>\n    </ul>\n    Claims of intellectual property infringement on the Services can be e-mailed to <a>admin@croonapp.com</a>.\n    <h4>Contact Us</h4>\n\n    If you have any questions about these Terms or otherwise need to contact Croon for any reason, you can reach us at <a>admin@croonapp.com</a>.\n    </div>\n    <div class="terms_cond">\n        <ion-item>\n          <ion-label (click)="terms(check_terms)">I agree to the terms and conditions</ion-label>\n          <ion-checkbox color="dark" checked="true" (click)="terms(check_terms)" [(ngModel)]="check_terms" (change)="check_terms = !check_terms" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n        </ion-item>\n        <button class="button-full" ion-button color="light" (click)="gotologin_final()">Next</button>        \n    </div>\n<!-- <ion-footer>\n    <ion-toolbar>\n        <ion-row>\n          \n            <ion-col col-2>\n                <ion-checkbox (click)="terms(check_terms)" [(ngModel)]="check_terms" (change)="check_terms = !check_terms" [ngModelOptions]="{standalone: true}" margin="12 "></ion-checkbox>\n            </ion-col>\n            <ion-col col-10>\n                <ion-label (click)="terms(check_terms)" style="white-space:normal;">I agree to the terms and conditions</ion-label>\n            </ion-col>\n          \n        </ion-row>\n        <ion-row></ion-row>\n        <ion-row>\n            <ion-col no-padding>\n            <button ion-button block id="signup_save_button" (click)="gotologin_final()" style="top: -15px;right: 5px;">Next</button> \n        </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer> -->\n</ion-content>\n\n'/*ion-inline-end:"/home/it/HSENGIV/CROON-ANDROID/src/pages/terms/terms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_signup_signup__["a" /* SignupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ })

});
//# sourceMappingURL=0.js.map