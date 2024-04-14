import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Length extends Expresion {
    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = this.valor.interpretar(entorno)
        console.log(value.valor)
        if (value.tipo == TipoDato.STRING) {
            return { valor: value.valor.length, tipo: TipoDato.NUMBER };
        } else {
            // Manejo de error si el valor no es un array o una cadena
            throw new Error('Error: El valor no es un vector, lista o cadena.');
        }
    }
}
