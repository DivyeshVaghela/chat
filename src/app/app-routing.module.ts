import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocketConnectionGuard } from './services/socket-connection.guard';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule),
    canActivate: [SocketConnectionGuard]
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
