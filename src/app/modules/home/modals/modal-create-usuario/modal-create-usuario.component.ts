import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuario } from '../../../../interface/usuario.interface';
import { NotifyService } from '../../../../services/notify.service';

@Component({
  selector: 'app-modal-create-usuario',
  standalone: false,
  
  templateUrl: './modal-create-usuario.component.html',
  styleUrl: './modal-create-usuario.component.scss'
})
export class ModalCreateUsuarioComponent implements OnInit{
  mainForm!:UntypedFormGroup;
  onCreate:EventEmitter<IUsuario> = new EventEmitter<IUsuario>();
  constructor(
    private _formBuilder:UntypedFormBuilder,
    public dialogRef: MatDialogRef<ModalCreateUsuarioComponent>,
    private _usuarioService:UsuarioService,
    @Inject( MAT_DIALOG_DATA ) public data:any,
    private _notifyService:NotifyService
  ) { 
  }
  ngOnInit() {
    this.mainForm=this._formBuilder.group({})
  }
  onSave(){
    if(!this.mainForm.valid){
      this._notifyService.showSnackAlert('Ingrese todos los datos primero', 'info');
      return;
    }
    this._notifyService.showSnackLoading();
    const dataToSave=this.mainForm.getRawValue().userForm;
    dataToSave.idCargo=dataToSave.cargo.selected_value.id;
    dataToSave.idDepartamento=dataToSave.departamento.selected_value.id;
    delete dataToSave.cargo;
    delete dataToSave.departamento;

    this._usuarioService.store(dataToSave).subscribe(
      val=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSingleMessage(val)
        if(val.data && val.data.usuario.id){
          this.onCreate.emit(val.data.usuario);
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
