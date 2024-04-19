import { Expresion } from "../Abstract/expresion";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Case extends Instruccion{
    expresion: Expresion
    instrucciones: Instruccion[]

    constructor(expresion:Expresion,instrucciones:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion
        this.instrucciones = instrucciones
    }
    public crearGrafico(padre: any){
       
            const nodoPadre = createNode('Intruccion case');
            createEdge(padre, nodoPadre);
        
            const nodoCase = createNode('case');
            createEdge(nodoPadre, nodoCase);
        
            const nodoExp = createNode('Expresion');
            createEdge(nodoPadre, nodoExp);
            this.expresion.crearGrafico(nodoExp);
        
            const nodoColon = createNode(':');
            createEdge(nodoPadre, nodoColon);
        
            const nodoInstrucciones = createNode('Instrucciones');
            createEdge(nodoPadre, nodoInstrucciones);
            for (const instruccion of this.instrucciones) {
                instruccion.crearGrafico(nodoInstrucciones);
            }
        
    }
    public interpretar(entorno : Environment): any {
       for(const instruccion of this.instrucciones){
            try{
                const ins = instruccion.interpretar(entorno);
                if(ins != null || ins != undefined){
                   return ins
                }
            }catch(error){
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error en case`));
            }
       }
    }
}