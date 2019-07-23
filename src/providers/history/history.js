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
var HistoryProvider = /** @class */ (function () {
    function HistoryProvider(global, http) {
        this.global = global;
        this.http = http;
        console.log('Hello HistoryProvider Provider');
    }
    HistoryProvider.prototype.history_dates = function () {
        return this.http.get(this.global.baseUrl + '/users/competitions');
    };
    HistoryProvider.prototype.history_paticular_dates = function (name, start_date) {
        return this.http.get(this.global.baseUrl + '/users/competition_select?data=' + name + '&&start_date=' + start_date);
    };
    HistoryProvider.prototype.history_music_details = function (dates_id, genre_id) {
        return this.http.get(this.global.baseUrl + '/users/history?competition_transaction_id=' + dates_id + '&&genre_id=' + genre_id);
    };
    HistoryProvider.prototype.history_music_details_limit = function (dates_id, genre_id, count) {
        return this.http.get(this.global.baseUrl + '/users/history?competition_transaction_id=' + dates_id + '&&genre_id=' + genre_id + '&&limit=' + count);
    };
    HistoryProvider.prototype.history_type = function () {
        return this.http.get(this.global.baseUrl + '/users/genres');
    };
    HistoryProvider.prototype.history_type_first = function () {
        return this.http.get(this.global.baseUrl + '/users/genres_first');
    };
    HistoryProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Globals, HttpClient])
    ], HistoryProvider);
    return HistoryProvider;
}());
export { HistoryProvider };
//# sourceMappingURL=history.js.map