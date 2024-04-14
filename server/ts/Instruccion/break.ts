import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Bloque } from "./bloque";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
export class Break extends Instruccion{
    constructor(linea:number,columna:number){
        super(linea,columna)
    }


    public  interpretar(environment : Environment,consola:string[]):any{

    }
    
}