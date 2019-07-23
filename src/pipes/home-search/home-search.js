var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the HomeSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var HomeSearchPipe = /** @class */ (function () {
    function HomeSearchPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    /*transform(value: string, ...args) {
      return value;
    }*/
    /*transform(items: any, conditions: {[field: string]: any}): Array<any> {
          return items.filter(item => {
              for (let field in conditions) {
                  if (item[field] !== conditions[field]) {
                      return false;
                  }
              }
              return true;
          });
      }*/
    HomeSearchPipe.prototype.transform = function (items, filterQuery) {
        if (!filterQuery)
            return items;
        return items.filter(function (item) {
            //console.log(item.title.toLowerCase().includes(filterQuery.toLowerCase()))
            return item.title.toLowerCase().includes(filterQuery.toLowerCase());
        });
    };
    HomeSearchPipe = __decorate([
        Pipe({
            name: 'homeSearch',
        })
    ], HomeSearchPipe);
    return HomeSearchPipe;
}());
export { HomeSearchPipe };
//# sourceMappingURL=home-search.js.map