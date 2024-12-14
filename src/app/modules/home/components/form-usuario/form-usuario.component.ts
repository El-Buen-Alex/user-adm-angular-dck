import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../../services/departamento.service';
import { CargoService } from '../../../../services/cargo.service';
import { IDepartamento } from '../../../../interface/departamento.interface';
import { ICargo } from '../../../../interface/cargo.interface';
import { IUsuario } from '../../../../interface/usuario.interface';

@Component({
  selector: 'app-form-usuario',
  standalone: false,
  
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})
export class FormUsuarioComponent implements OnInit {
  fatherForm!:UntypedFormGroup;
  mainForm!:UntypedFormGroup;
  departamentos:IDepartamento[]=[]
  cargos:ICargo[]=[]
  @Input() userInformation?:IUsuario
  @Output() onSave : EventEmitter<any> = new EventEmitter();
  @Input() customTextConfirmButton:string='Aceptar'
  constructor(
    private _ctrlForm:FormGroupDirective,
    private _formBuilder: UntypedFormBuilder,
    private _departamentoService:DepartamentoService,
    private _cargoService:CargoService
  ){
    
  }
  ngOnInit(): void {
    this.getCargos();
    this.getDepartamentos();
    this.fatherForm=this._ctrlForm.form;
    this.mainForm=this._formBuilder.group({
      'usuario': [this.userInformation?.usuario, [Validators.required]],
      'email': [this.userInformation?.email, [Validators.required]],
      'primerNombre': [this.userInformation?.primerNombre, [Validators.required]],
      'primerApellido': [this.userInformation?.primerApellido, [Validators.required]],
      'segundoNombre': [this.userInformation?.segundoApellido, [Validators.required]],
      'segundoApellido': [this.userInformation?.segundoApellido, [Validators.required]],
    })
    this.fatherForm.addControl('userForm', this.mainForm)
  }
  getDepartamentos(){
    this._departamentoService.get().subscribe(
      (val)=>{
        if(val.data  && val.data.departamentos && val.data.departamentos.length>0){
          this.departamentos=val.data.departamentos;
        }
      }
    )
  }
  
  getCargos(){
    this._cargoService.get().subscribe(
      (val)=>{
        if(val.data  && val.data.cargos && val.data.cargos.length>0){
          this.cargos=val.data.cargos;
        }
      }
    )
  }

  doAction(){
    if(this.mainForm.valid){
      const dataToSave=this.mainForm.getRawValue();
      dataToSave.idCargo=dataToSave.cargo.selected_value.id;
      dataToSave.idDepartamento=dataToSave.departamento.selected_value.id;
      delete dataToSave.cargo;
      delete dataToSave.departamento;
      this.onSave.emit({
        status:true,
        data:dataToSave
      })
    }
  }
  cancelar(){
    this.onSave.emit({
      status:false,
      data:null
    })
  }
}
