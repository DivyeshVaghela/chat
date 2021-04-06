import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../shared/api-config';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  list(query?: any): Observable<any> {
    let url = ApiConfig.messages;
    url += this.utilService.getQueryString(query);
    return this.http.get<any>(url);
  }
}
