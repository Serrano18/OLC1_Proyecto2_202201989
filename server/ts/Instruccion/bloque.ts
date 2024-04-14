import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
export class Bloque extends Instruccion{
    instrucciones: Instruccion[]

    constructor(instrucciones: Instruccion[],fila:number,columna:number){
        super(fila,columna)
        this.instrucciones = instrucciones
    }

    public interpretar(entorno : Environment, consola: string[]): any {
        const newEntorno:Environment = new Environment(entorno)
        for (const instruct of this.instrucciones){
            try{
                const elemento = instruct.interpretar(newEntorno,consola)
                if(elemento != null || elemento != undefined){
                    return elemento
                }
            }catch(error){
                console.log(error)
            };
 
        }
       return null;
    }
}