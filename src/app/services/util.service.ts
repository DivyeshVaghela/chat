import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getQueryString(query: any) {
    if (!query)
      return '';
    
    let queryString = '';
    Object.keys(query).forEach((key: string) => {
      queryString += `${key}=${query[key]}&`;
    });
    if (queryString.length){
      queryString = '?' + queryString;
    }
    return queryString.substring(0, queryString.length - 1);
  }
}
