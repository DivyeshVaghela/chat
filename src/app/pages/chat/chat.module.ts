import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChatComponent } from './chat.component';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ChatComponent }
    ]),
    SharedModule
  ]
})
export class ChatModule { }
