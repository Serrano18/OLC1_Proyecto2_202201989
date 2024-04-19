import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";

export class Length extends Expresion {
    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    
    public crearGrafico(parent: any) {
        const parentNode = createNode('Length');
        createEdge(parent, parentNode);
    
        const expNode = createNode('Expresion');
        createEdge(parentNode, expNode);
        this.valor.crearGrafico(expNode);
    
        const dotNode = createNode('.');
        createEdge(parentNode, dotNode);
    
        const lengthNode = createNode('length');
        createEdge(parentNode, lengthNode);
    
        const lParenNode = createNode('(');
        createEdge(parentNode, lParenNode);
    
        const rParenNode = createNode(')');
        createEdge(parentNode, rParenNode);
    
        const semiColonNode = createNode(';');
        createEdge(parentNode, semiColonNode);
    }

    public interpretar(entorno : Environment) : Resultado{
       
        const value = this.valor.interpretar(entorno)
        if (value.tipo == TipoDato.STRING) {//es una cadena
            return { valor: value.valor.length, tipo: TipoDato.NUMBER };
        } else if(value.tipo == TipoDato.ID){ //si es un vector
            const vect = entorno.getVector(value.valor)
            return {valor: vect?.values.length, tipo: TipoDato.NUMBER} //por si el valor es undefined o null
        }else{
                 // Manejo de error si el valor no es un array o una cadena
            throw lerrores.push(new errores(this.line, this.column, "Semantico", ` El valor no es un vector, lista o cadena.`));
        }
    }
}
