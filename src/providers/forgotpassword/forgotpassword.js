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
var ForgotpasswordProvider = /** @class */ (function () {
    function ForgotpasswordProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello ForgotpasswordProvider Provider');
    }
    ForgotpasswordProvider.prototype.forgotpassword = function (emailid) {
        return this.http.get(this.global.baseUrl + '/users/forgot_password?email_id=' + emailid);
    };
    ForgotpasswordProvider.prototype.forgotpassword_otp = function (emailid, otp) {
        return this.http.get(this.global.baseUrl + '/users/get_otp?email_id=' + emailid + '&&otp=' + otp);
    };
    ForgotpasswordProvider.prototype.forgotpassword_final = function (emailid, otp, password) {
        return this.http.put(this.global.baseUrl + '/users/set_password', { "email_id": emailid, "otp": otp, "password": password });
    };
    ForgotpasswordProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Globals, HttpClient])
    ], ForgotpasswordProvider);
    return ForgotpasswordProvider;
}());
export { ForgotpasswordProvider };
//# sourceMappingURL=forgotpassword.js.map