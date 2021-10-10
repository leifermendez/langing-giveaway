import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SharedModule} from "../shared/shared/shared.module";
import { ControlComponent } from './control/control.component';


@NgModule({
  declarations: [DashboardComponent, ControlComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
