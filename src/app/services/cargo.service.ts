import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import IApiResponse from '../interface/apiResponse.interface';
import { IDepartamento, IDepartamentoResponse } from '../interface/departamento.interface';
import { ICargoResponse } from '../interface/cargo.interface';

@Injectable({
	providedIn: 'root'
})

export class CargoService{

    route:string;

    constructor(
		private _httpClient : HttpClient,
	) {
		this.route=ENV.apiUrl+'/cargos';
	}


    get(params={}): Observable<IApiResponse<ICargoResponse>>{
		return this._httpClient.get<IApiResponse<ICargoResponse>>(`${this.route}`, {params:params});
    }
}