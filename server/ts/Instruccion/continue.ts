import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Continue extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)   
    }
    public crearGrafico(padre: any){
            const nodoPadre = createNode('Instuccion continue');
            createEdge(padre, nodoPadre);
        
            const nodoContinue = createNode('continue');
            createEdge(nodoPadre, nodoContinue);
        
            const nodoPuntoComa = createNode(';');
            createEdge(nodoPadre, nodoPuntoComa);
        
    }
    public  interpretar(environment : Environment):any{
        return "continue";
    }
    
}