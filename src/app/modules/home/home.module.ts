import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexUsuarioComponent } from './index-usuario/index-usuario.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../../shared/core.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalEditUsuarioComponent } from './modals/modal-edit-usuario/modal-edit-usuario.component';
import { ModalDeleteUsuarioComponent } from './modals/modal-delete-usuario/modal-delete-usuario.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { ModalCreateUsuarioComponent } from './modals/modal-create-usuario/modal-create-usuario.component';



@NgModule({
  declarations: [
    IndexUsuarioComponent,
    ModalEditUsuarioComponent,
    ModalDeleteUsuarioComponent,
    FormUsuarioComponent,
    ModalCreateUsuarioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class HomeModule { }
