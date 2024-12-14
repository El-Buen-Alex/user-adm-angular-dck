import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../../services/usuario.service';
import { IUsuario } from '../../../../interface/usuario.interface';
import { NotifyService } from '../../../../services/notify.service';

@Component({
  selector: 'app-modal-delete-usuario',
  standalone: false,
  templateUrl: './modal-delete-usuario.component.html',
  styleUrl: './modal-delete-usuario.component.scss',
})
export class ModalDeleteUsuarioComponent {
  usuario!:IUsuario
  onDelete:EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteUsuarioComponent>,
    @Inject( MAT_DIALOG_DATA ) public data:any,
    private _usuarioService:UsuarioService,
    private _notifyService:NotifyService
  ) { 
    this.usuario=this.data.usuario
  }

  deleteUsuario(){
    this._notifyService.showSnackLoading();
    this._usuarioService.delete(this.usuario.id).subscribe(
      (val)=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSingleMessage(val)
        if(val.data && val.data.usuario){
          this.onDelete.emit( true );
          this.dialogRef.close({
            status : true,
          });
        }
      },
      er=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSnackAlert('Ha ocurrido un error', 'error');
      }
    )
  }
}
