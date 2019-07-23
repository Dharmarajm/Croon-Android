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
  Generated class for the ViewProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ViewProvider = /** @class */ (function () {
    function ViewProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello ViewProvider Provider');
    }
    ViewProvider.prototype.getComments = function (id) {
        return this.http.get(this.global.baseUrl + '/users/comments?upload_id=' + id)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.getComments_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/comments?upload_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.uploadCmts = function (data) {
        return this.http.post(this.global.baseUrl + '/users/post_comments', data)
            .map(function (response) { return response.json(); });
    };
    ViewProvider.prototype.voteUpdate = function (data) {
        return this.http.post(this.global.baseUrl + '/users/post_vote', data);
    };
    ViewProvider.prototype.Votestatus = function (userId, uploadId) {
        return this.http.get(this.global.baseUrl + '/users/check_vote?user_id=' + userId + '&&upload_id=' + uploadId)
            .map(function (response) { return response.json(); });
    };
    ViewProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Globals])
    ], ViewProvider);
    return ViewProvider;
}());
export { ViewProvider };
//# sourceMappingURL=view.js.map