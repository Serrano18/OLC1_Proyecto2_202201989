import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Tostring extends Expresion {

    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = this.valor.interpretar(entorno)
        if (value.tipo == TipoDato.NUMBER || value.tipo == TipoDato.DOUBLE ||value.tipo == TipoDato.BOOLEANO) {
            return { valor: value.valor.toString(), tipo: TipoDato.STRING };
        } else {
            // Manejo de error si el valor no es un número o booleano
            throw new Error('Error: El valor no es numérico o booleano.');
        }
    }
}