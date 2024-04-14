import { Expresion } from "../../Abstract/expresion";
import { TipoDato } from "../../Abstract/resultado";
import { Bloque } from "../bloque";
import { Instruccion } from "../../Abstract/instruccion";
import { Environment } from "../../Symbol/Evironment";
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

    public interpretar(entorno : Environment,consola: string[]): any {
        const condicion = this.condicion.interpretar(entorno)
        if (condicion.tipo!=TipoDato.BOOLEANO)
            throw Error("La condición no es booleana")
        if (condicion.valor){
            return this.bloqueIf.interpretar(entorno,consola)
        }else{
            console.log("else")
            console.log({else:this.bloqueElse})
            return this.bloqueElse.interpretar(entorno,consola)
        }
    }
}