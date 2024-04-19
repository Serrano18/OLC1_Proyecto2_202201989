import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";

import { createEdge,createNode } from "../graphivz/graphviz";
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
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a entero`));
                }
            case 'double':
                switch (value.tipo) {
                    case TipoDato.NUMBER:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: TipoDato.DOUBLE };
                    case TipoDato.STRING:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: TipoDato.DOUBLE };
                    default:
                      throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a double`));
                }
            case 'char':
                switch (value.tipo) {
                    case TipoDato.NUMBER:
                        return { valor: String.fromCharCode(value.valor), tipo: TipoDato.CHAR };
                    default:
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a char`));
                }
            case 'std::string':
                switch (value.tipo) {
                    case TipoDato.NUMBER:
                        return { valor: value.valor.toString(), tipo: TipoDato.STRING };
                    case TipoDato.DOUBLE:
                        return { valor: value.valor.toString(), tipo: TipoDato.STRING };
                    default:
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a string`));
                }
            default:
               throw lerrores.push(new errores(this.line, this.column, "Semantico", `tipo dato ${tip} no valido para la conversion`));
        }
    }
    public crearGrafico(padre: any) {
        const nodoPadre = createNode('Casteo');
        createEdge(padre, nodoPadre);
    
        const nodoTipo = createNode(`${this.tipo}`);
        createEdge(nodoPadre, nodoTipo);
    
        const nodoLParen = createNode('(');
        createEdge(nodoPadre, nodoLParen);
    
        const nodoExpresion = createNode('Expresion');
        createEdge(nodoPadre, nodoExpresion);
        this.valor.crearGrafico(nodoExpresion);
    
        const nodoRParen = createNode(')');
        createEdge(nodoPadre, nodoRParen);
    }
}
