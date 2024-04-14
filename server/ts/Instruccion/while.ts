import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
export class While extends Instruccion{
    condicion: Expresion
    bloquedo: Bloque

    constructor(condicion:Expresion,bloquedo:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.condicion = condicion
        this.bloquedo = bloquedo
    }

    public interpretar(entorno : Environment,consola: string[]): any {
        let condicion = this.condicion.interpretar(entorno)
        if(condicion.tipo != TipoDato.BOOLEANO){
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        while(condicion.valor){

            const bloquedo = this.bloquedo.interpretar(entorno,consola);
            if(bloquedo != null){
                if(bloquedo=="continue"){
                    continue;
                }else if(bloquedo=="break"){
                    break;
                }else{
                    throw new Error("Instruccion no valida");
                }
            }
            condicion = this.condicion.interpretar(entorno)
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
            }
        }
    }
}