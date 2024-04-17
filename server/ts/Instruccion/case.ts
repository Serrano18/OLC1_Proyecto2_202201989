import { Expresion } from "../Abstract/expresion";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
export class Case extends Instruccion{
    expresion: Expresion
    instrucciones: Instruccion[]

    constructor(expresion:Expresion,instrucciones:Instruccion[],linea:number,columna:number){
        super(linea,columna)
        this.expresion = expresion
        this.instrucciones = instrucciones
    }

    public interpretar(entorno : Environment,consola: string[]): any {
       for(const instruccion of this.instrucciones){
            try{
                const ins = instruccion.interpretar(entorno,consola);
                if(ins != null){
                   return ins
                }
            }catch(error){
                throw new Error("Ya valio no funcioanInstrucciones")
            }
       }
    }
}