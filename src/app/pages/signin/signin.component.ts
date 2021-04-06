import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';


import { SocketService } from 'src/app/services/socket.service';
import { IncomingSocketEvents, OutgoingSocketEvents } from '../../shared/socket-events';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private socket: any;
  joiningStatus: 'notJoinied'|'joining'|'joined' = 'notJoinied';

  constructor(
    private router: Router,
    private socketService: SocketService,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {

    const activeUser = this.storage.get('activeUser');
    if (activeUser){
      this.mobileNumber = activeUser.mobileNumber;
      this.name = activeUser.name;
      this.join();
    }
  }

  mobileNumber: string | undefined;
  name: string | undefined;
  formError: any = {};
  join() {
    if (!this.mobileNumber || !String(this.mobileNumber).match(new RegExp('^[0-9]{10}$'))){
      this.formError.mobileNumber = 'Please enter your 10 digit mobile number';
      return;
    }
    if (!this.name || !this.name.trim().length){
      this.formError.name = 'Please enter your name';
      return;
    }

    this.socket = this.socketService.connect(String(this.mobileNumber));

    this.joiningStatus = 'joining';
    this.socketService.emit(OutgoingSocketEvents.JOIN, {
      mobileNumber: this.mobileNumber,
      name: this.name
    });
    this.socketService.listen(IncomingSocketEvents.JOIN_SUCCESS)
      .subscribe(data => {
        this.joiningStatus = 'joined';
        this.storage.set('activeUser', data.user);
        this.router.navigateByUrl('/chat', { replaceUrl: true });
      });

  }

}
