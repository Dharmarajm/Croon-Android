import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HomeSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'homeSearch',
})
export class HomeSearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
 
  transform(items: any[], filterQuery: any): any[] {

        if (!filterQuery) return items;
        return items.filter(function(item){ 
          console.log(item)
          //console.log(item.title.toLowerCase().includes(filterQuery.toLowerCase()))
            return item.title.toLowerCase().includes(filterQuery.toLowerCase());
        })
  }
  
}
