import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Typeof extends Expresion {
    constructor(private valor : any, line : number, column: number){
        super(line, column);
    }
    public crearGrafico(parent: any) {
        const parentNode = createNode('Typeof');
        createEdge(parent, parentNode);
    
        const typeofNode = createNode('typeof');
        createEdge(parentNode, typeofNode);
    
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
        }else if (value.tipo == TipoDato.NULO){
            return { valor: 'null', tipo: TipoDato.STRING }; 
        }else {
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `El tipo de valor ${value.tipo} no es valido en el lenguaje.`));
        }
    }
    private isFloat(n: number): boolean {
        return Number(n) === n && n % 1 !== 0;
    }
}
