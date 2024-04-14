import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
export class Dowhile extends Instruccion{
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
        do{
            condicion = this.condicion.interpretar(entorno)
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
            }
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

        }while(condicion.valor);
    }
}