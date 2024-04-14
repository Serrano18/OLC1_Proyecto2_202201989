import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Round extends Expresion {
    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = this.valor.interpretar(entorno)
        if ( value.tipo == TipoDato.NUMBER || value.tipo == TipoDato.DOUBLE) {
            return { valor: Math.round(value.valor), tipo: TipoDato.NUMBER };
        } else {
            // Manejo de error si el valor no es un número
            throw new Error('Error: El valor no es un número.');
        }
    }
}
