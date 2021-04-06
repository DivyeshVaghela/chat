import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @ts-ignore
import * as socketIO from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket: any;

  constructor() {
  }

  get socket(){
    return this._socket;
  }

  connect(authToken: string) {
    this._socket = socketIO(environment.SOCKET_ENDPOINT, {
      withCredentials: true,
      transports: ['websocket']
    })

    this._socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return this._socket;
  }


  listen(eventName: string) {
    return new Observable<any>(subscriber => {
      this._socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any) {
    this._socket.emit(eventName, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
  
}
