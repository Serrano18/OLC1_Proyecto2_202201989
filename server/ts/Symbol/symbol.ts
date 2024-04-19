import { TipoDato } from "../Abstract/resultado";

export class Symbol{
    public id: string;
    public value: any;
    public type: TipoDato;
    public fila:number;
    public columna : number
    public type2:string;

    constructor(id: string, type: TipoDato, value: any,type2:string,fila:number,columna:number) {
        this.id = id.toLowerCase();
        this.type = type;
        this.type2 = type2
        this.value = value;
        this.fila = fila;
        this.columna = columna
    }
}