import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuario } from '../../../../interface/usuario.interface';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NotifyService } from '../../../../services/notify.service';

@Component({
  selector: 'app-modal-edit-usuario',
  standalone: false,
  
  templateUrl: './modal-edit-usuario.component.html',
  styleUrl: './modal-edit-usuario.component.scss'
})
export class ModalEditUsuarioComponent implements OnInit {

  usuario!:IUsuario
  mainForm!:UntypedFormGroup;
  onUpdate:EventEmitter<IUsuario> = new EventEmitter<IUsuario>();
  constructor(
    public dialogRef: MatDialogRef<ModalEditUsuarioComponent>,
    @Inject( MAT_DIALOG_DATA ) public data:any,
    private _usuarioService:UsuarioService,
    private _formBuilder:UntypedFormBuilder,
    private _notifyService:NotifyService
  ) { 
    this.usuario=this.data.usuario
  }
  ngOnInit(): void {
    this.mainForm=this._formBuilder.group({
    })
  }

  onSave(){
    if(!this.mainForm.valid){
      this._notifyService.showSnackAlert('Ingrese todos los datos primero', 'info');
      return;
    }
    const dataToSave=this.mainForm.getRawValue().userForm;
    dataToSave.idCargo=dataToSave.cargo.selected_value.id;
    dataToSave.idDepartamento=dataToSave.departamento.selected_value.id;
    delete dataToSave.cargo;
    delete dataToSave.departamento;
    dataToSave.id=this.usuario.id;
    this._usuarioService.update(dataToSave).subscribe(
      val=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSingleMessage(val)
        if(val.data && val.data.usuario.id){
          this.onUpdate.emit(val.data.usuario);
          this.dialogRef.close(true);
        }
      },
      er=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSnackAlert('Ha ocurrido un error', 'error');
      }
    )
  }
}
