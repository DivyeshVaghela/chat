import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SigninComponent],
  imports: [
    RouterModule.forChild([
      { path:'', component: SigninComponent }
    ]),
    SharedModule
  ]
})
export class SigninModule { }
