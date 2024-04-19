import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class While extends Instruccion{
    condicion: Expresion
    bloquedo: Bloque

    constructor(condicion:Expresion,bloquedo:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.bloquedo = bloquedo
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción While');
        createEdge(padre, nodoPadre);
    
        const nodoWhile = createNode('While');
        createEdge(nodoPadre, nodoWhile);
        const nodopari = createNode('(');
        createEdge(nodoPadre, nodopari);
        const nodoExpresion = createNode('Expresion');
        createEdge(nodoPadre, nodoExpresion);
        this.condicion.crearGrafico(nodoExpresion);
        const nodopard = createNode(')');
        createEdge(nodoPadre, nodopard);
        const nodoBloque = createNode('Bloque');
        createEdge(nodoPadre, nodoBloque);
        this.bloquedo.crearGrafico(nodoBloque);
    }
    public interpretar(entorno : Environment): any {
        let condicion = this.condicion.interpretar(entorno)
        if(condicion.tipo != TipoDato.BOOLEANO){
            throw lerrores.push(new errores(this.line,this.column,'Semantico',"La condicion no es de tipo booleano"));
        }
        while(condicion.valor){
            condicion = this.condicion.interpretar(entorno)
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw lerrores.push(new errores(this.line,this.column,'Semantico',"La condicion no es de tipo booleano"));
            }
            const bloquedo = this.bloquedo.interpretar(entorno);
            if(bloquedo != null || bloquedo != undefined){
                if(bloquedo=="continue"){
                    continue;
                }else if(bloquedo=="break"){
                    break;
                }else if(bloquedo.tV == 'return'){
                    return bloquedo
                }else{
                    throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro de ciclo While`));
             
                }
            }
            
        }
    }
}