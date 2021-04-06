import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  set(key: string, value: any) {
    if (value !== null && typeof value === "object"){
      value = JSON.stringify(value);
    }
    this.localStorage.setItem(key, value);
  }

  get(key: string): any {
    let value = this.localStorage.getItem(key);
    if (value) {
      value = JSON.parse(value)
    }
    return value;
  }

  remove(key: string) {
    this.localStorage.removeItem(key);
  }

}
