import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ParticipantsComponent} from "./participants/participants.component";
import {SessionGuard} from "../../core/guards/session.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'participants',
    component: ParticipantsComponent,
    canActivate: [SessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
