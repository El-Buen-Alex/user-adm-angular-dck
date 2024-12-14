import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-autocomplete',
  standalone: false,
  templateUrl: './custom-autocomplete.component.html',
  styleUrl: './custom-autocomplete.component.scss',
})
export class CustomAutocompleteComponent implements OnInit {
  @Input() customLabel: string;
  @Input() customFormControlName: string;
  @Input() placeholder: string;
  @Input() items: any;
  @Input() itemSelected?: any;
  @Output() onSelectedValue:EventEmitter<any>=new EventEmitter<any>()

  fatherForm!:UntypedFormGroup;
  mainForm!:UntypedFormGroup;

  constructor(
    private _ctrlForm:FormGroupDirective,
    private _formBuilder: UntypedFormBuilder,
  ){
    this.customLabel='';
    this.customFormControlName='';
    this.placeholder='';
    
  }
  ngOnInit(): void {
    this.fatherForm=this._ctrlForm.form;
    this.mainForm=this._formBuilder.group({
      'selected_value': [this.itemSelected, [Validators.required]],
    })
    this.fatherForm.addControl(this.customFormControlName, this.mainForm)
  }


  showObject(data:any){
    if ( data ) { return data.nombre; }
  }
  onSelectionChange(event:any){
    this.onSelectedValue.emit(event.option.value)
  }
}
