import { Instruccion } from "../Abstract/instruccion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
export class Subebaja extends Instruccion{
    private id:string;
    private tipo:boolean;
    constructor(id:string,tipo:boolean,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.tipo = tipo
    }
    public interpretar(entorno : Environment,consola: string[]): null {
        const value = entorno.getVariable(this.id);
        if(value == null){
            throw new Error(`La variable ${this.id} no existe`);
        }
        if(value.type == TipoDato.NUMBER || value.type == TipoDato.DOUBLE){
            if(this.tipo){
                entorno.editarVariable(this.id,value.value + 1,value.type,"variable",this.line,this.column);
            }else{
                entorno.editarVariable(this.id,value.value - 1,value.type,"variable",this.line,this.column);
            }
        }else{
            throw new Error(`Error:  ${value.type} no es valido`);
        }
        return null;
    }
}