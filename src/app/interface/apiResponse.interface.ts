export default interface IApiResponse<T>{
    code:Number;
    type:string;
    message:string;
    data:T;
}