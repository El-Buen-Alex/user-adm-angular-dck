import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';

const routes: Routes = [
	{
		path : '',
		outlet : 'header',
		component : HeaderComponent
	},
	{
		path : '',
		loadChildren : () => import('../modules/home/home.module').then(m => m.HomeModule)
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ModulesRoutingModule { }
