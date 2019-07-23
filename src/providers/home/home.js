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
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HomeProvider = /** @class */ (function () {
    function HomeProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello HomeProvider Provider');
    }
    HomeProvider.prototype.homeGenre = function (id) {
        return this.http.get(this.global.baseUrl + '/users/toplist?genre_id=' + id)
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.homeSearch = function (genreId, keyword) {
        return this.http.get(this.global.baseUrl + '/users/search_toplist?genre_id=' + genreId + '&&keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.home_type = function () {
        return this.http.get(this.global.baseUrl + '/users/genres')
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.home_type_first = function () {
        return this.http.get(this.global.baseUrl + '/users/genres_first')
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.model_upload = function (uploader_id) {
        return this.http.get(this.global.baseUrl + '/users/view_uploads?upload_id=' + uploader_id)
            .map(function (response) { return response.json(); });
    };
    HomeProvider.prototype.homeGenre_limit = function (id, count) {
        return this.http.get(this.global.baseUrl + '/users/toplist?genre_id=' + id + '&&limit=' + count)
            .map(function (response) { return response.json(); });
    };
    HomeProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Globals])
    ], HomeProvider);
    return HomeProvider;
}());
export { HomeProvider };
//# sourceMappingURL=home.js.map