import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Ternario extends Expresion {
    constructor(private condicion:any,private exp1 : any,private exp2:any, line : number, column: number){
        super(line, column);
    }
    public crearGrafico(parent: any) {
        const parentNode = createNode('Ternario');
        createEdge(parent, parentNode);
    
        const condicionNode = createNode('Condicion');
        createEdge(parentNode, condicionNode);
        this.condicion.crearGrafico(condicionNode);
    
        const ternaryNode = createNode('?');
        createEdge(parentNode, ternaryNode);
    
        const exp1Node = createNode('If');
        createEdge(parentNode, exp1Node);
        this.exp1.crearGrafico(exp1Node);
    
        const colonNode = createNode(':');
        createEdge(parentNode, colonNode);
    
        const exp2Node = createNode('Else');
        createEdge(parentNode, exp2Node);
        this.exp2.crearGrafico(exp2Node);
    
    
    }
    public interpretar(entorno : Environment) : Resultado{
        const con = this.condicion.interpretar(entorno)

        if(con.tipo == TipoDato.BOOLEANO){
            if(con.valor){
                return  this.exp1.interpretar(entorno)
            }else{
                return  this.exp2.interpretar(entorno)

            }
        }else{
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `La condicion no es booleana.`));
        }
  
    }
}
