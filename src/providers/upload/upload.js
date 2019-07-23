var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
/*
  Generated class for the UploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UploadProvider = /** @class */ (function () {
    function UploadProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello UploadProvider Provider');
    }
    UploadProvider.prototype.getLanguages = function () {
        return this.http.get(this.global.baseUrl + '/users/languages')
            .map(function (response) { return response.json(); });
    };
    UploadProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Globals])
    ], UploadProvider);
    return UploadProvider;
}());
export { UploadProvider };
//# sourceMappingURL=upload.js.map