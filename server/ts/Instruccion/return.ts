import { Instruccion } from "../Abstract/instruccion";
import { TipoDato } from "../Abstract/resultado";
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Return extends Instruccion{
    private expresion:Expresion | null
    
    constructor(expresion:Expresion | null,line:number,column:number){
        super(line,column);
        this.expresion = expresion;
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción Return');
        createEdge(padre, nodoPadre);
    
        const nodoReturn = createNode('return');
        createEdge(nodoPadre, nodoReturn);
    
        if(this.expresion != null){
            const nodoExpresion = createNode('Expresion');
            createEdge(nodoPadre, nodoExpresion);
            this.expresion.crearGrafico(nodoExpresion);
        }
        const nodoPuntoComa = createNode(';');
        createEdge(nodoPadre, nodoPuntoComa);
    
    }
    public interpretar(entorno: Environment):any {
        if(this.expresion != null){
            const value = this.expresion.interpretar(entorno);
            return {line:this.line,column:this.column,tV:"return",value:value.valor,type:value.tipo};
        }else{
            return {line:this.line,column:this.column,tV:"return",value:null,type:TipoDato.NULO};
        }
    }

}