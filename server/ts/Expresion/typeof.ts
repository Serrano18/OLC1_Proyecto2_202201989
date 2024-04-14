import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Typeof extends Expresion {
    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = this.valor.interpretar(entorno)
        if (value.tipo == TipoDato.NUMBER ) {
            if (this.isFloat(value)) {
                return { valor: 'double', tipo: TipoDato.STRING };
            } else {
                return { valor: 'number', tipo: TipoDato.STRING };
            }
        } else if (value.tipo == TipoDato.BOOLEANO) {
            return { valor: 'boolean', tipo: TipoDato.STRING };
        } else if (value.tipo == TipoDato.STRING ) { 
            if (value.valor.length == 1) {
                return { valor: 'char', tipo: TipoDato.STRING };
            } else {
                return { valor: 'string', tipo: TipoDato.STRING };
            }
        } else if (Array.isArray(value.valor)) {
            return { valor: 'array', tipo: TipoDato.STRING };
        } else {
            throw new Error('Error: Saber que tipo es');
        }
    }
    private isFloat(n: number): boolean {
        return Number(n) === n && n % 1 !== 0;
    }
}
