import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessagesService } from 'src/app/services/messages.service';

import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { IncomingSocketEvents, OutgoingSocketEvents } from '../../shared/socket-events';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private socket: any;
  date = new Date();

  activeUser: any;

  users: any[] = [];
  isLoadingUsers: boolean = true;
  selectedUser: any = null;

  messages: any = {};

  constructor(
    private router: Router,
    private socketService: SocketService,
    private storage: LocalStorageService,
    private userService: UserService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadUserList();
    this.listenMessages();

    this.socketService.listen(IncomingSocketEvents.USER_JOINED)
      .subscribe(data => {
        this.users.push({
          mobileNumber: data.user.mobileNumber,
          name: data.user.name
        })
      });
  }

  loadCurrentUser() {
    this.activeUser = this.storage.get('activeUser');
  }

  loadUserList(){
    this.isLoadingUsers = true;
    this.userService.list()
      .subscribe(res => {
        if (res && Array.isArray(res)){
          this.users = res.filter(u => {
            return u.mobileNumber !== this.activeUser.mobileNumber
          });
        }
        this.isLoadingUsers = false;
      }, e => console.log('There was some problem while fetching users', e));
  }

  isLoadingChatMessages: boolean = true;

  /**
   * @param withUser mobile number of the user
   */
  loadChatMessages(withUser: string) {
    this.isLoadingChatMessages = true;
    this.messagesService.list({ from: this.activeUser.mobileNumber, to: withUser })
      .subscribe(res => {
        this.messages[this.selectedUser.mobileNumber] = res;
        this.isLoadingChatMessages = false;
      }, e => console.log('ERROR in loading chat messages', e));
  }

  listenMessages() {
    this.socketService.listen(IncomingSocketEvents.MESSAGE)
      .subscribe(m => {
        if (!this.messages[m.from]){
          this.messages[m.from] = [];
        }
        this.messages[m.from].unshift(m);
      })
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.loadChatMessages(this.selectedUser.mobileNumber);
  }

  message: string = '';
  sendMessage() {
    this.message = this.message.trim();
    const messageObj: any = {
      from: this.activeUser.mobileNumber,
      to: this.selectedUser.mobileNumber,
      message: this.message 
    };
    this.socketService.emit(OutgoingSocketEvents.MESSAGE, messageObj);

    messageObj.date = new Date();
    this.messages[this.selectedUser.mobileNumber].unshift(messageObj);
    this.message = '';
  }

  logout() {
    this.socketService.disconnect();
    this.storage.remove('activeUser');
    this.router.navigateByUrl('/signin');
  }
}
