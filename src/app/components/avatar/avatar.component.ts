import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  avatar: string = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';

  @Input()
  alt: String = 'Avatar';

  constructor() { }

  ngOnInit(): void {
  }

}
