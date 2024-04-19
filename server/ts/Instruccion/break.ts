import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Break extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }

    public crearGrafico(padre: any){
    const nodoPadre = createNode('Instruccion Break');
    createEdge(padre, nodoPadre);

    const nodoBreak = createNode('break');
    createEdge(nodoPadre, nodoBreak);

    const nodoPuntoComa = createNode(';');
    createEdge(nodoPadre, nodoPuntoComa);

    }
    public  interpretar(environment : Environment):any{
        return "break";
    }
    
}