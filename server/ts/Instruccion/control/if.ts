import { Expresion } from "../../Abstract/expresion";
import { TipoDato } from "../../Abstract/resultado";
import { Bloque } from "../bloque";
import { Instruccion } from "../../Abstract/instruccion";

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

    public interpretar(consola: string[]): null {
        const condicion = this.condicion.interpretar()
        if (condicion.tipo!=TipoDato.BOOLEANO)
            throw Error("La condición no es booleana")
        if (condicion.valor){
            this.bloqueIf.interpretar(consola)
        }else{
            console.log("else")
            console.log({else:this.bloqueElse})
            this.bloqueElse.interpretar(consola)
        }
        return null
    }
}