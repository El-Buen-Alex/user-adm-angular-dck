import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import IApiResponse from '../interface/apiResponse.interface';
import { IDepartamento, IDepartamentoResponse } from '../interface/departamento.interface';
import { ICargoResponse } from '../interface/cargo.interface';
import { IUsuarioCreateResponse, IUsuarioDeleteResponse, IUsuarioResponse } from '../interface/usuario.interface';

@Injectable({
	providedIn: 'root'
})

export class UsuarioService{

    route:string;

    constructor(
		private _httpClient : HttpClient,
	) {
		this.route=ENV.apiUrl+'/usuarios';
	}


    get(params={}): Observable<IApiResponse<IUsuarioResponse>>{
		return this._httpClient.get<IApiResponse<IUsuarioResponse>>(`${this.route}`, {params:params});
    }
	store(params:any):Observable<IApiResponse<IUsuarioCreateResponse>>{
		return this._httpClient.post<IApiResponse<IUsuarioCreateResponse>>(`${this.route}`, params);
	}
	update(params:any):Observable<IApiResponse<IUsuarioCreateResponse>>{
		return this._httpClient.put<IApiResponse<IUsuarioCreateResponse>>(`${this.route}/${params.id}`, params);
	}
	delete(id:number):Observable<IApiResponse<IUsuarioDeleteResponse>>{
		return this._httpClient.delete<IApiResponse<IUsuarioDeleteResponse>>(`${this.route}/${id}`);
	}
}