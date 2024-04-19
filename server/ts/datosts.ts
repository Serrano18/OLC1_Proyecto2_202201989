import { TipoDato } from "./Abstract/resultado";
import { Environment } from "./Symbol/Evironment";
export class Datosts{
    public id: string;
    public value: any;
    public type: TipoDato;
    public fila:number|undefined;
    public columna : number
    public type2:string;
    public entorno:Environment

    constructor(id: string, type: TipoDato, value: any,type2:string,entorno:Environment,fila:number|undefined,columna:number) {
        this.id = id.toLowerCase();
        this.type = type;
        this.type2 = type2
        this.value = value;
        this.entorno = entorno;
        this.fila = fila;
        this.columna = columna;
    }
}