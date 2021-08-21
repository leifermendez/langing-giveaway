import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ParticipantsComponent} from "./participants/participants.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'participants',
    component: ParticipantsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
