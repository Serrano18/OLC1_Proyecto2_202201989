import { Expresion } from "../Abstract/expresion";
import { Resultado } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

export class Valorid extends Expresion{

    constructor(private id:string,line:number,column:number){
        super(line,column);
    }
    public interpretar(entorno : Environment) : Resultado{
        const value = entorno.getVariable(this.id);
        if(value != null){
            return {valor: value.value,tipo:value.type}
        }else{
            throw new Error(`La variable ${this.id} no existe`);
        }
    }

}