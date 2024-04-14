import { env } from "process"
import { Symbol } from "./symbol";
import {TipoDato } from "../Abstract/resultado";
import { Function } from "../Instruccion/Funciones";

export class Environment{
    
    private variables : Map<string, Symbol>;
    public funciones : Map<string, Function>;

    constructor(public anterior : Environment | null){
        this.variables = new Map();
        this.funciones = new Map();
    }
    public guardar(id: string, valor: any, tipo: TipoDato,tipo2:string,fila:number,columna:number){ //UNICAMENTE PARA DECLARAR
        let env : Environment | null = this;
            if(env.variables.has(id)){
                throw Error("Variable ya declarada anteriormente");
            }
        this.variables.set(id, new Symbol( id, tipo,valor,tipo2,fila,columna));
    }

    public editarVariable(id: string, valor: any, tipo: TipoDato,tipo2:string,fila:number,columna:number){ //UNICAMENTE PARA DECLARAR
        let env : Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Symbol( id, tipo,valor,tipo2,fila,columna));
                return;
            }
            env = env.anterior;
        }
        throw Error("Variable no existente")
    }
    

    public guardarFuncion(id: string, funcion : Function){//no funciona aun
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
    }

    public getVariable(id: string) : Symbol | undefined | null {
        let env : Environment | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }   

    public getFuncion(id: string) : Function | undefined{ //no funciona aun no maneja funciones
        let env : Environment | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal() : Environment{  //no funciona
        let env : Environment | null = this;
        while(env?.anterior != null){
            env = env.anterior;
        }
        return env;
    }
}
/*envGlobal

function X() {
    env
    env.anterior = envGlobal;
    if(1){
        envIf
        envIf.anterior = env

    }
}*/ 