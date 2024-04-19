import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Dowhile extends Instruccion{
    condicion: Expresion
    bloquedo: Bloque

    constructor(condicion:Expresion,bloquedo:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.bloquedo = bloquedo
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción DoWhile');
        createEdge(padre, nodoPadre);
    
        const nodoDo = createNode('do');
        createEdge(nodoPadre, nodoDo);
    
        const nodoBloque = createNode('block');
        createEdge(nodoPadre, nodoBloque);
        this.bloquedo.crearGrafico(nodoBloque);
    
        const nodoWhile = createNode('while');
        createEdge(nodoPadre, nodoWhile);
    
        const nodoLParen = createNode('(');
        createEdge(nodoPadre, nodoLParen);
    
        const nodoExpresion = createNode('Expression');
        createEdge(nodoPadre, nodoExpresion);
        this.condicion.crearGrafico(nodoExpresion);
    
        const nodoRParen = createNode(')');
        createEdge(nodoPadre, nodoRParen);
    
        const nodoPuntoComa = createNode(';');
        createEdge(nodoPadre, nodoPuntoComa);
    
    }
    public interpretar(entorno : Environment): any {
        let condicion = this.condicion.interpretar(entorno)
        if(condicion.tipo != TipoDato.BOOLEANO){
            throw lerrores.push(new errores(this.line,this.column,'Semantico',"La condicion no es booleana ciclo Dowhile"));
        }
        do{

            const bloquedo = this.bloquedo.interpretar(entorno);
            if(bloquedo != null || bloquedo != undefined){
                if(bloquedo=="continue"){
                    continue;
                }else if(bloquedo=="break"){
                    break;
                }else if(bloquedo.tV=="return"){
                    return bloquedo;
                }else{
                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro de DoWhile`));
               
                }
            }
            condicion = this.condicion.interpretar(entorno)
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw lerrores.push(new errores(this.line,this.column,'Semantico',"La condicion no es booleana ciclo Dowhile"));
            }
        }while(condicion.valor);
    }
}