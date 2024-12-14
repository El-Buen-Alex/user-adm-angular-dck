export interface IDepartamento{
    id:number;
    codigo:string;
    nombre:string;
    activo:boolean;
}

export interface IDepartamentoResponse{
    departamentos:IDepartamento[]
}