import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Round extends Expresion {
    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public crearGrafico(parent: any) {
        const parentNode = createNode('Round');
        createEdge(parent, parentNode);
    
        const reservada = createNode('round');
        createEdge(parentNode, reservada);
        const lParenNode = createNode('(');
        createEdge(parentNode, lParenNode);
    
        const expNode = createNode('Expresion');
        createEdge(parentNode, expNode);
        this.valor.crearGrafico(expNode);
    
        const rParenNode = createNode(')');
        createEdge(parentNode, rParenNode);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = this.valor.interpretar(entorno)
        if ( value.tipo == TipoDato.NUMBER || value.tipo == TipoDato.DOUBLE) {
            return { valor: Math.round(value.valor), tipo: TipoDato.NUMBER };
        } else {
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `El valor no es un número.`));
        }
    }
}
