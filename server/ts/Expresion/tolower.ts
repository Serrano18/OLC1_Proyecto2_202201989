import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Tolower extends Expresion {

    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public crearGrafico(parent: any) {
        const parentNode = createNode('toLower');
        createEdge(parent, parentNode);
        const reservada = createNode('toupper');
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
        if(value.tipo == TipoDato.STRING){
            return {valor : value.valor.toLowerCase(), tipo : TipoDato.STRING};
        }else{
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `El valor ${value.valor} no es una cadena.`));
        }
    }
}