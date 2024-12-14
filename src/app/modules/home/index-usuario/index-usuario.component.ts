import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../services/departamento.service';
import { IDepartamento } from '../../../interface/departamento.interface';
import { CargoService } from '../../../services/cargo.service';
import { ICargo } from '../../../interface/cargo.interface';
import { IUsuario } from '../../../interface/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteUsuarioComponent } from '../modals/modal-delete-usuario/modal-delete-usuario.component';
import { ModalCreateUsuarioComponent } from '../modals/modal-create-usuario/modal-create-usuario.component';
import { ModalEditUsuarioComponent } from '../modals/modal-edit-usuario/modal-edit-usuario.component';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-index-usuario',
  standalone: false,
  
  templateUrl: './index-usuario.component.html',
  styleUrl: './index-usuario.component.scss'
})
export class IndexUsuarioComponent implements OnInit {
  assistanceForm:UntypedFormGroup;
  items:any[]
  departamentos:IDepartamento[]=[]
  cargos:ICargo[]=[]
  usuarios:IUsuario[]=[]
  table:{
    headers:string[],
    dataSource:MatTableDataSource<IUsuario>
  }
  cargoIdSelected?:number;
  departamentoIdSelected?:number;
  constructor(
    private _formBuilder:UntypedFormBuilder,
    private _departamentoService:DepartamentoService,
    private _cargoService:CargoService,
    private _usuarioService: UsuarioService,
    public dialog: MatDialog,
    private _notifyService:NotifyService
  ) {
    this.assistanceForm=this._formBuilder.group({
    });
    this.items=[
      {
        name:"aaaa"
      }
    ]
    this.table={
      headers:[
        'usuario', 'nombre', 'apellido', 'departamento', 'cargo','email', 'actions'
      ],
      dataSource: new MatTableDataSource()
    }
  }
  ngOnInit(): void {
    this.getDepartamentos();
    this.getCargos();
    this.getUsuarios();
  }

  getUsuarios(){
    this._notifyService.showSnackLoading();
    const params:any={}
    if(this.cargoIdSelected){
      params['cargoId']=this.cargoIdSelected
    }
    if(this.departamentoIdSelected){
      params['departamentoId']=this.departamentoIdSelected
    }
    this._usuarioService.get(params).subscribe(
      (val)=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSingleMessage(val)
        if(val.data  && val.data.usuarios){
          this.usuarios=val.data.usuarios;
          this.table.dataSource=new MatTableDataSource(this.usuarios)
        }
      },
      err=>{
        this._notifyService.hideSnackLoading();
        this._notifyService.showSnackAlert('Ha ocurrido un error', 'error');
      }
    )
  }

  getCargos(){
    this._cargoService.get({forSearchs:1}).subscribe(
      (val)=>{
        if(val.data  && val.data.cargos && val.data.cargos.length>0){
          this.cargos=val.data.cargos;
        }
      }
    )
  }

  getDepartamentos(){
    this._departamentoService.get({forSearchs:1}).subscribe(
      (val)=>{
        if(val.data  && val.data.departamentos && val.data.departamentos.length>0){
          this.departamentos=val.data.departamentos;
        }
      }
    )
  }

  openDelete(usuario:IUsuario){
    const dialogRef = this.dialog.open( ModalDeleteUsuarioComponent, {
			width:'400px',
			panelClass : 'custom-dialog-panel',
      position:{top:'80px'},
			disableClose : true,
			data: {
				usuario : usuario
			}
		});
    dialogRef.componentInstance.onDelete.subscribe(result=>{
      if(result){
        const index=this.table.dataSource.data.findIndex(current=>current.id===usuario.id);
        if(index!==-1){
          this.table.dataSource.data.splice(index, 1)
          this.table.dataSource.data=this.table.dataSource.data
        }
      }
    })
  }

  openEdit(usuario:IUsuario){
    const dialogRef = this.dialog.open( ModalEditUsuarioComponent, {
      width:'650px',
      maxWidth:'60vw',
			height : '600px',
			disableClose : true,
      panelClass:'custom-panel',
      data:{
        usuario:usuario
      }
		});
    dialogRef.componentInstance.onUpdate.subscribe(result=>{
      if(result){
        const index=this.usuarios.findIndex(val=>val.id==result.id)
        if(index>=0){
          this.usuarios[index]=result;
          this.table.dataSource.data=this.usuarios;
        }
      }
    })
  }

  openCreate(){
    const dialogRef = this.dialog.open( ModalCreateUsuarioComponent, {
			width:'650px',
      maxWidth:'60vw',
			height : '600px',
			disableClose : true,
      panelClass:'custom-panel',
      data:{}
		});
    dialogRef.componentInstance.onCreate.subscribe(result=>{
      if(result){
        this.usuarios.push(result)
        this.table.dataSource.data=this.usuarios;
      }
    })
  }

  onCargoChange(val:ICargo){
    this.cargoIdSelected=val.id
    this.getUsuarios();
  }
  onDepartamentoChange(val:IDepartamento){
    this.departamentoIdSelected=val.id;
    this.getUsuarios()
  }
}
