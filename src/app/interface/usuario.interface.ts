import { ICargo } from "./cargo.interface";
import { IDepartamento } from "./departamento.interface";

export interface IUsuario{
    id:number;
    usuario:string;
    primerNombre:string;
    segundoNombre:string;
    primerApellido:string;
    segundoApellido:string;
    email:string;
    idDepartamento:number;
    idCargo:number;
    cargo?: ICargo;
    departamento?: IDepartamento;
}

export interface IUsuarioResponse{
    usuarios:IUsuario[]
}

export interface IUsuarioDeleteResponse{
    usuario:IUsuario
}

export interface IUsuarioCreateResponse{
    usuario:IUsuario 
}