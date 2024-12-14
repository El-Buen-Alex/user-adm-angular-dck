export interface ICargo{
    id:number;
    codigo:string;
    nombre:string;
    activo:boolean;
}

export interface ICargoResponse{
    cargos:ICargo[]
}