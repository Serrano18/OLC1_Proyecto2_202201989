import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
export class For extends Instruccion{
    declaracion:Instruccion
    actualizacion:Instruccion
    condicion: Expresion
    bloquef: Bloque

    constructor(declaracion:Instruccion,condicion:Expresion,actualizacion:Instruccion,bloquef:Bloque,linea:number,columna:number){
        super(linea,columna)
        this.declaracion = declaracion
        this.condicion = condicion
        this.actualizacion = actualizacion
        this.bloquef = bloquef
    }

    public interpretar(entorno : Environment,consola: string[]): any {
        const newEntorno:Environment = new Environment(entorno)
        this.declaracion.interpretar(newEntorno,consola)
        let condicion = this.condicion.interpretar(newEntorno)
        if(condicion.tipo != TipoDato.BOOLEANO){
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        while(condicion.valor){
            const bloquef = this.bloquef.interpretar(newEntorno,consola);
            if(bloquef != null){
                if(bloquef=="continue"){
                    continue;
                }else if(bloquef=="break"){
                    break;
                }else{
                    throw new Error("Instruccion no valida");
                }
            }
            this.actualizacion.interpretar(newEntorno,consola);
            condicion = this.condicion.interpretar(newEntorno);
            if(condicion.tipo != TipoDato.BOOLEANO){
                throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
            }
        }
    }
}