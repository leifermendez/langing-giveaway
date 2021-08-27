import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostGeneralComponent } from './post-general/post-general.component';
import {SharedModule} from "../shared/shared/shared.module";


@NgModule({
  declarations: [PostGeneralComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
