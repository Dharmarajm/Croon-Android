var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
var LoginProvider = /** @class */ (function () {
    function LoginProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello LoginProvider Provider');
    }
    LoginProvider.prototype.login = function (emailid, password, player) {
        return this.http.post(this.global.baseUrl + '/users/login', { "email_id": emailid, "password": password, "player_id": player });
    };
    LoginProvider.prototype.login_google_fb = function (email_id, password, login_status, image_path, name, player) {
        return this.http.post(this.global.baseUrl + '/users/social_media_registration', { "email_id": email_id, "password": password, "login_status": login_status, "image_path": image_path, "name": name, "player_id": player });
    };
    LoginProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Globals, HttpClient])
    ], LoginProvider);
    return LoginProvider;
}());
export { LoginProvider };
//# sourceMappingURL=login.js.map