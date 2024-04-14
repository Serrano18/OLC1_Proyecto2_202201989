import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Casteo extends Expresion {
    constructor(private tipo:any,private valor : any,  line : number, column: number){
        super(line, column);
    }
    
    public interpretar(entorno: Environment): Resultado {
        const value = this.valor.interpretar(entorno);
        const tip = this.tipo;
        
        switch (tip) {
            case 'int':
                switch (value.tipo) {
                    case TipoDato.DOUBLE:
                        return { valor: parseInt(value.valor), tipo: TipoDato.NUMBER };
                   case TipoDato.CHAR:
                        return { valor: value.valor, tipo: TipoDato.NUMBER };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            case 'double':
                switch (value.tipo) {
                    case TipoDato.NUMBER:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: TipoDato.DOUBLE };
                    case TipoDato.STRING:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: TipoDato.DOUBLE };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            case 'char':
                switch (value.tipo) {
                    case TipoDato.NUMBER:
                        return { valor: String.fromCharCode(value.valor), tipo: TipoDato.CHAR };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            case 'std::string':
                switch (value.tipo) {
                    case TipoDato.NUMBER:
                        return { valor: value.valor.toString(), tipo: TipoDato.STRING };
                    case TipoDato.DOUBLE:
                        return { valor: value.valor.toString(), tipo: TipoDato.STRING };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            default:
                throw new Error('Error: Tipo de dato de destino desconocido');
        }
    }
    
}
