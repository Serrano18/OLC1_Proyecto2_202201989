//solo con fila y columna obtiene un valor
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment";
import { TipoDato,Resultado } from "../Abstract/resultado";
export class Vvector extends Expresion{
    public fila:Expresion;
    public col:Expresion|null;
   public id : string
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(id:string, fila:Expresion,col:Expresion|null,linea:number,columna:number){
        super(linea,columna)
        this.fila = fila;
        this.col = col
        this.id=id
    }
    public interpretar(entorno : Environment): Resultado {

       const vector = entorno.obtenerVector(this.id)
       const fila = this.fila.interpretar(entorno)
       if(fila.tipo!=TipoDato.NUMBER){
        throw new Error("El tipo de dato no es un entero")
       }
       let col 
       if(this.col != null){
            col = this.col.interpretar(entorno).valor
            console.log("dato que interpreta",col)
       }else{
            col=0
       }
       if(vector == null){
            throw new Error("No existe el vector")
       }
            return {valor: vector.getValue(fila.valor,col).value,tipo:vector.tipo} 
    }
}