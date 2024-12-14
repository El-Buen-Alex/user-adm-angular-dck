import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';




@NgModule({
  declarations: [
  ],
  imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      MatBottomSheetModule,
  ],
  exports: [
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      MatBottomSheetModule,
  ],
})
export class CoreModule { }
