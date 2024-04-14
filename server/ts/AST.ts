import { Expresion } from "./Abstract/expresion";
import { Instruccion } from "./Abstract/instruccion";
import { Environment } from "./Symbol/Evironment";   
export class AST {
    public instrucciones: Instruccion[]
    public consola:string[]
    public entornoglobal : Environment

    constructor(instrucciones: Instruccion[]){
        this.instrucciones = instrucciones
        this.consola = []
        this.entornoglobal = new Environment(null)
    }

    public Ejecutar(){
        
       // Primera pasada
       this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(this.entornoglobal,this.consola)
       });
    }
    public getConsola(){
        console.log(this.consola)
        let salid = ""
        for (let index = 0; index < this.consola.length; index++) {
            salid += this.consola[index].toString();
        }
        console.log(salid)
        return salid
    }
}