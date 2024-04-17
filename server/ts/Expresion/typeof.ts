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
           
           return { valor: 'int', tipo: TipoDato.STRING };
            
        } else if (value.tipo == TipoDato.BOOLEANO) {
            return { valor: 'bool', tipo: TipoDato.STRING };
        } else if (value.tipo == TipoDato.STRING ) { 
                return { valor: 'std::string', tipo: TipoDato.STRING }; 
        } else if (value.tipo == TipoDato.DOUBLE ) { 
            return { valor: 'double', tipo: TipoDato.STRING }; 
        }else if (value.tipo == TipoDato.CHAR ) { 
            return { valor: 'char', tipo: TipoDato.STRING }; 
        }else if (Array.isArray(value.valor)) {
            return { valor: 'array', tipo: TipoDato.STRING };
        } else {
            throw new Error('Error: Saber que tipo es');
        }
    }
    private isFloat(n: number): boolean {
        return Number(n) === n && n % 1 !== 0;
    }
}
