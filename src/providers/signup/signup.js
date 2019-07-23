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
var SignupProvider = /** @class */ (function () {
    function SignupProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello SignupProvider Provider');
    }
    SignupProvider.prototype.signup = function (emailid, password) {
        return this.http.post(this.global.baseUrl + '/users/register', { "email_id": emailid, "password": password });
    };
    SignupProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Globals, HttpClient])
    ], SignupProvider);
    return SignupProvider;
}());
export { SignupProvider };
//# sourceMappingURL=signup.js.map