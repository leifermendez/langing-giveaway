import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {JoinComponent} from "./components/join/join.component";
import {SharedModule} from "../shared/shared/shared.module";
import {HomeSectionComponent} from "./components/home-section/home-section.component";
import { ParticipantsComponent } from './participants/participants.component';
import {CountUpModule} from "ngx-countup";
import {YouTubePlayerModule} from "@angular/youtube-player";


@NgModule({
  declarations: [MainComponent, JoinComponent, HomeSectionComponent, ParticipantsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CountUpModule,
    YouTubePlayerModule
  ]
})
export class HomeModule {
}
