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
var SearchProvider = /** @class */ (function () {
    function SearchProvider(http, global) {
        this.http = http;
        this.global = global;
        console.log('Hello SearchProvider Provider');
    }
    SearchProvider.prototype.homeTopList = function (keyword) {
        return this.http.get(this.global.baseUrl + '/users/search_toplist?keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    SearchProvider.prototype.historyOrder = function (keyword, limit) {
        return this.http.get(this.global.baseUrl + '/users/search_history?keyword=' + keyword + '&&limit=' + limit)
            .map(function (response) { return response.json(); });
    };
    SearchProvider.prototype.home_keywords_list = function (keyword) {
        return this.http.get(this.global.baseUrl + '/users/search_keyword?keyword=' + keyword)
            .map(function (response) { return response.json(); });
    };
    SearchProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Globals])
    ], SearchProvider);
    return SearchProvider;
}());
export { SearchProvider };
//# sourceMappingURL=search.js.map