import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Default extends Instruccion{
    instrucciones: Instruccion[]

    constructor(instrucciones:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.instrucciones = instrucciones
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instruccion Default');
        createEdge(padre, nodoPadre);
    
        const nodoDefault = createNode('default');
        createEdge(nodoPadre, nodoDefault);
    
        const nodoColon = createNode(':');
        createEdge(nodoPadre, nodoColon);
    
        const nodoInstrucciones = createNode('instucciones');
        createEdge(nodoPadre, nodoInstrucciones);
    
        for (const instruccion of this.instrucciones) {
            instruccion.crearGrafico(nodoInstrucciones);
        }
    }
    public interpretar(entorno : Environment): any {
       for(const instruccion of this.instrucciones){
            try{
                const ins = instruccion.interpretar(entorno);
                if(ins != null){
                    if(ins=="continue"){
                        continue;
                    }else if(ins=="break"){
                        break;
                    }else if(ins.tV=="return"){
                        return ins;
                    }else{
                        throw lerrores.push(new errores(this.line,this.column,'Semantico',`Instruccion no valida dentro de Default`));
                    }
                }
            }catch(error){
              throw lerrores.push(new errores(this.line,this.column,'Semantico',"Error en la interpretacion de instruccion Default"));
            }
       }
    }
}