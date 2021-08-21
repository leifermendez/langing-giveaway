import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CallBackComponent} from "./call-back/call-back.component";

const routes: Routes = [
  {
    path: 'callback',
    component: CallBackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
