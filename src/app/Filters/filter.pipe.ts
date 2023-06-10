import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items) {
      return [];
    }
    if (!filter || Object.keys(filter).length === 0) {
      return items;
    }

    const filteredItems = items.filter(item => {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          const filterValue = filter[key];
          const itemValue = item[key];
          if (filterValue && itemValue && itemValue.toString().toLowerCase().indexOf(filterValue.toString().toLowerCase()) === -1) {
            return false;
          }
          if (filterValue && !itemValue) {
            return false;
          }
        }
      }
      return true;
    });

    return filteredItems;
  }
}