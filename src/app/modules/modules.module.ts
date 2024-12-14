import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { ModulesRoutingModule } from './modules-routing.module';
import { CoreModule } from '../shared/core.module';



@NgModule({
  declarations: [
    HeaderComponent,
],
imports: [
    CommonModule,
    ModulesRoutingModule,
    CoreModule,
]
})
export class ModulesModule { }
