import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostGeneralComponent} from "./post-general/post-general.component";

const routes: Routes = [
  {
    path: ':slug',
    component: PostGeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
