import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module'

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ApikeyFormComponent } from './containers/apikey-form/apikey-form.component';


@NgModule({
  declarations: [
    AuthComponent,
    ApikeyFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
