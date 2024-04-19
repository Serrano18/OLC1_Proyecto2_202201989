import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";

import { createEdge,createNode } from "../graphivz/graphviz";
export class Bloque extends Instruccion{
    instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[],fila:number,columna:number){
        super(fila,columna)
        this.instrucciones = instrucciones
    }
    public crearGrafico(padre: any){
        const nodoLlaveAbierta = createNode('{');
        createEdge(padre, nodoLlaveAbierta);
    
        for (const instruccion of this.instrucciones) {
            instruccion.crearGrafico(padre);
        }
    
        const nodoLlaveCerrada = createNode('}');
        createEdge(padre, nodoLlaveCerrada);
    }
    public interpretar(entorno : Environment): any {
        const newEntorno:Environment = new Environment(entorno)
        for (const instruct of this.instrucciones){
            try{
                const elemento = instruct.interpretar(newEntorno)
                if(elemento != null || elemento != undefined){
                    if(elemento == 'continue' )  {
                            continue;
                    }
                    return elemento;
                }
            }catch(error){
                console.log(error);
            }
 
        }
       return null;
    }
}