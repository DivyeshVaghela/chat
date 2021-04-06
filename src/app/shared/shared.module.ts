import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AvatarComponent } from '../components/avatar/avatar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

  BsDropdownModule.forRoot()
];

const COMPONENTS = [
  AvatarComponent
]


@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    MODULES
  ],
  exports: [
    MODULES,

    COMPONENTS
  ],
  providers: [
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }
  ]
})
export class SharedModule { }
