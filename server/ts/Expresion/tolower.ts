import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Tolower extends Expresion {

    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = this.valor.interpretar(entorno)
        if(value.tipo == TipoDato.STRING){
            return {valor : value.valor.toLowerCase(), tipo : TipoDato.STRING};
        }else{
            throw new Error('Error: El valor no es una cadena.');
        }
    }
}