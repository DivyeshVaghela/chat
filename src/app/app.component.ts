import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, } from 'rxjs';

import { take } from "rxjs/operators";

import { SocketService } from './services/socket.service';
import { IncomingSocketEvents, OutgoingSocketEvents } from './shared/socket-events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {}

}
