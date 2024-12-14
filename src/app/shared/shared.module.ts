import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core.module';

import { CustomAutocompleteComponent } from './custom-autocomplete/custom-autocomplete.component';
import { SnackLoadingComponent } from './snack-loading/snack-loading.component';
import { SnackMessageComponent } from './snack-message/snack-message.component';


@NgModule({
  declarations: [
    CustomAutocompleteComponent,
    SnackLoadingComponent,
    SnackMessageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports:[
    CustomAutocompleteComponent,
    SnackLoadingComponent,
    SnackMessageComponent
  ]
})
export class SharedModule { }
