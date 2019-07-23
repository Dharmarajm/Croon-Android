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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../../providers/global';
import 'rxjs/add/operator/map';
/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var VotesProvider = /** @class */ (function () {
    function VotesProvider(http, global, https) {
        this.http = http;
        this.global = global;
        this.https = https;
        console.log('Hello VotesProvider Provider');
    }
    VotesProvider.prototype.votedisp = function (id) {
        return this.http.get(this.global.baseUrl + '/users/myvotes?user_id=' + id)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.uploaddisp = function (id) {
        return this.http.get(this.global.baseUrl + '/users/myuploads?user_id=' + id)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.votedisp_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/myvotes?user_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.uploaddisp_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/myuploads?user_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    VotesProvider.prototype.register = function (data) {
        return this.https.post(this.global.baseUrl + '/users/profile_upload', JSON.stringify(data), httpOptions);
    };
    VotesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Globals, HttpClient])
    ], VotesProvider);
    return VotesProvider;
}());
export { VotesProvider };
//# sourceMappingURL=myvotes.js.map