import { HttpException } from "./http-exception";

export class HttpInternalError extends HttpException{
    message: string;
    name: string;
    constructor(){
        super("HttpInternalError", "Error interno en el servidor");
    }
}