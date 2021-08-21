import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallBackComponent } from './call-back/call-back.component';
import {SharedModule} from "../shared/shared/shared.module";


@NgModule({
  declarations: [CallBackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
