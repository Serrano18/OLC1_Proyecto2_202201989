import { Expresion } from "../../Abstract/expresion";
import { TipoDato } from "../../Abstract/resultado";
import { Bloque } from "../bloque";
import { Instruccion } from "../../Abstract/instruccion";
import { Environment } from "../../Symbol/Evironment";
import { lerrores,errores } from "../../Tablasimbolos";
import { createNode,createEdge } from "../../graphivz/graphviz";
export class FN_IF extends Instruccion{
    condicion: Expresion
    bloqueIf: Bloque
    bloqueElse: Bloque

    constructor(condicion:Expresion,bloqueIf:Bloque,bloqueElse:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.bloqueIf = bloqueIf
        this.bloqueElse  = bloqueElse
    }
    
    public crearGrafico(padre: any) {
        return ""
    }

    public interpretar(entorno : Environment): any {
        const condicion = this.condicion.interpretar(entorno)
        if (condicion.tipo!=TipoDato.BOOLEANO)
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `La condicion no es booleana.`));
        if (condicion.valor){
            return this.bloqueIf.interpretar(entorno)
        }else if(this.bloqueElse != null){
            return this.bloqueElse.interpretar(entorno)
        }
        return null
    }
}