import { Expresion } from "../Abstract/expresion";
import {  Resultado,TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Ternario extends Expresion {
    constructor(private condicion:any,private exp1 : any,private exp2:any, line : number, column: number){
        super(line, column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const con = this.condicion.interpretar(entorno)
        const ex1 = this.exp1.interpretar(entorno)
        const ex2 = this.exp2.interpretar(entorno)

        if(con.tipo == TipoDato.BOOLEANO){
            if(con.valor){
                return {valor: ex1.valor, tipo : ex1.tipo};
            }else{
                return {valor: ex2.valor, tipo : ex2.tipo};
            }
        }else{
            throw new Error('Error: LA CONDICION NO ES VALIDA');
        }
  
    }
}
