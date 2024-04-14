import { Instruccion } from "../Abstract/instruccion";
import { TipoDato } from "../Abstract/resultado";
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment";
export class Avariable extends Instruccion{
    private id:string;
    private valor:Expresion|null;
    constructor(id:string,valor:Expresion|null,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.valor = valor
    }
    public interpretar(entorno : Environment,consola: string[]): null {
        const value = entorno.getVariable(this.id);
        if(value == null){
            throw new Error(`La variable ${this.id} no existe`);
        }
        if(this.valor != null){
            const valor = this.valor.interpretar(entorno);
            if(value.type == valor.tipo){
                entorno.editarVariable(this.id,valor.valor,valor.tipo,"variable",this.line,this.column);
            }else{
                throw new Error(`Error:  ${value.type} no es valido`);
            }
        }else{
            throw new Error(`Error: tipo es null`);
        }
        return null;
    }
}