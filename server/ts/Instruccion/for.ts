import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class For extends Instruccion{
    declaracion:Instruccion
    actualizacion:Instruccion
    condicion: Expresion
    bloquef: Bloque

    constructor(declaracion:Instruccion,condicion:Expresion,actualizacion:Instruccion,bloquef:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.actualizacion = actualizacion
        this.bloquef = bloquef
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción For');
        createEdge(padre, nodoPadre);

        const nodoFor = createNode('for');
        createEdge(nodoPadre, nodoFor);

        const nodoLParen = createNode('(');
        createEdge(nodoPadre, nodoLParen);

        const nodoInstruction = createNode('Instucciones');
        createEdge(nodoPadre, nodoInstruction);
        this.declaracion.crearGrafico(nodoInstruction);

        const nodoSemiColon1 = createNode(';');
        createEdge(nodoPadre, nodoSemiColon1);

        const nodoExpression = createNode('Expresion');
        createEdge(nodoPadre, nodoExpression);
        this.condicion.crearGrafico(nodoExpression);

        const nodoSemiColon2 = createNode(';');
        createEdge(nodoPadre, nodoSemiColon2);

        const nodoInstruction2 = createNode('Instrucciones');
        createEdge(nodoPadre, nodoInstruction2);
        this.actualizacion.crearGrafico(nodoInstruction2);

        const nodoRParen = createNode(')');
        createEdge(nodoPadre, nodoRParen);

        const nodoBlock = createNode('Block');
        createEdge(nodoPadre, nodoBlock);
         this.bloquef.crearGrafico(nodoBlock);

    }
    public interpretar(entorno : Environment): any {
        const newEntorno:Environment = new Environment(entorno)
        this.declaracion.interpretar(newEntorno)
        let condicion = this.condicion.interpretar(newEntorno)
        if(condicion.tipo != TipoDato.BOOLEANO){
            throw lerrores.push(new errores(this.line,this.column,'Semantico',"La condicion no es booleana ciclo For"));
        }
        while(condicion.valor){
            const bloquef = this.bloquef.interpretar(newEntorno);
            if(bloquef != null){
                if(bloquef=="continue"){
                    continue;
                }else if(bloquef=="break"){
                    break;
                }else if (bloquef.tV == 'return'){
                    return bloquef;
                }else{
                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro de For`));
                }
            }
            this.actualizacion.interpretar(newEntorno);
            condicion = this.condicion.interpretar(newEntorno);
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw lerrores.push(new errores(this.line,this.column,'Semantico',"La condicion no es booleana ciclo For"));
            }
        }
    }
}