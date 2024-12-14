import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import IApiResponse from '../interface/apiResponse.interface';
import { IDepartamento, IDepartamentoResponse } from '../interface/departamento.interface';

@Injectable({
	providedIn: 'root'
})

export class DepartamentoService{

    route:string;

    constructor(
		private _httpClient : HttpClient,
	) {
		this.route=ENV.apiUrl+'/departamentos';
	}


    get(params={}): Observable<IApiResponse<IDepartamentoResponse>>{
		return this._httpClient.get<IApiResponse<IDepartamentoResponse>>(`${this.route}`, {params:params});
    }
}