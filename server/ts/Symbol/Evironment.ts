import { env } from "process"
import { Symbol } from "./symbol";
import {TipoDato } from "../Abstract/resultado";
import { Function } from "../Instruccion/declafuncion";
import { Datosts } from "../datosts";
import { globalMap } from "../Tablasimbolos";
import { Vector } from "./vector";
import { lerrores,errores } from "../Tablasimbolos";
export class Environment{
    
    private variables : Map<string, Symbol>;
    private arreglos : Map<string,Vector>
    public funciones : Map<string, Function>;

    constructor(public anterior : Environment | null){
        this.variables = new Map();
        this.funciones = new Map();
        this.arreglos = new Map();
    }
    public guardar(id: string, valor: any, tipo: TipoDato,tipo2:string,fila:number,columna:number){ //UNICAMENTE PARA DECLARAR
        let env : Environment | null = this;
            if(env.variables.has(id)){
                throw lerrores.push(new errores(fila,columna,"Semantico",`Variable ${id} ya declarada anteriormente`));
                
            }else if(env.arreglos.has(id)){
                throw lerrores.push(new errores(fila,columna,"Semantico",`Arreglo ${id} declarado anteriormente`));
                
            }else if(env.funciones.has(id)){
                throw lerrores.push(new errores(fila,columna,"Semantico",`Funcion ${id} declarado anteriormente`));
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
       throw lerrores.push(new errores(fila,columna,"Semantico",`Variable ${id} no declarada`));
    }
    
    public guardarVariablesTablaSimbolos(id: string, valor: any, tipo: TipoDato, tipo2: string,entorno:Environment, fila: number, columna: number) {
        // Verificar si ya existe una entrada con el mismo id, tipo y entorno
        const existingIndex = globalMap.some((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo && variable.entorno == entorno;
        });
    
        if (existingIndex) {
            throw lerrores.push(new errores(fila,columna,"Semantico",`Variable ${id} ya declarada anteriormente`));
        }
    
        // Si no existe, agregar una nueva entrada al array
        globalMap.push(new Datosts(id, tipo, valor, tipo2, entorno, fila, columna));
    }
    
    public editarVariableTablaSimbolos(id: string, valor: any, tipo: TipoDato, tipo2: string,entorno:Environment, fila: number, columna: number) {
        
        // Buscar la variable en el array
         const existingIndex = globalMap.findIndex((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo;
        });
        if (existingIndex>=0) {
            globalMap[existingIndex] = new Datosts(id, tipo, valor, tipo2, entorno, globalMap[existingIndex].fila, globalMap[existingIndex].columna);
            
        }else{
            throw lerrores.push(new errores(fila,columna,"Semantico",`Variable ${id} no declarada`));
          
        }
     
    
    }

    //vectores
    public guardarVector(id: string, tipo: TipoDato,nfila:number,ncolumna:number,fila:number,columna:number){ //UNICAMENTE PARA DECLARAR
        let env : Environment | null = this;
        if(env.arreglos.has(id)){
            throw lerrores.push(new errores(fila,columna,"Semantico",`Vector ${id} ya declarado anteriormente`));
            
        }else if(env.variables.has(id)){
            throw lerrores.push(new errores(fila,columna,"Semantico",`Variable ${id} ya declarada anteriormente`));
        }else if(env.funciones.has(id)){
            throw lerrores.push(new errores(fila,columna,"Semantico",`Funcion ${id} declarado anteriormente`));
        }
        this.arreglos.set(id, new Vector( id, tipo,nfila,ncolumna,fila,columna));
    }

    public obtenerVector(id: string): Vector|null|undefined{ //UNICAMENTE PARA DECLARAR
        let env : Environment | null = this;
        while(env != null){
            if(env.arreglos.has(id)){
                  return env.arreglos.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    public guardarVectorTablaSimbolos(id: string, tipo: TipoDato,valores:any,nfila:number,ncolumna:number,fila:number,columna:number,entorno:Environment) {
        // Verificar si ya existe una entrada con el mismo id, tipo y entorno
       
        const existingIndex = globalMap.some((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo ;
        });
    
        if (existingIndex) {
            throw lerrores.push(new errores(fila,columna,"Semantico",`Vector ${id} ya declarado anteriormente`));
        }
        // Si no existe, agregar una nueva entrada al array
        globalMap.push(new Datosts(id,tipo,valores,"Vector",entorno,fila,columna));
    }
    
    public editarVectorTablaSimbolos(id: string, valor: any, tipo: TipoDato, fila: number, columna: number) {
        // Buscar la variable en el array
        const existingIndex = globalMap.findIndex((variable) => {
            return variable.id == id && variable.fila == fila && variable.columna == columna && variable.type == tipo;
        });
    
        if (existingIndex) {
            globalMap[existingIndex] = new Datosts(id, globalMap[existingIndex].type, valor, globalMap[existingIndex].type2,globalMap[existingIndex].entorno, globalMap[existingIndex].fila,globalMap[existingIndex].columna);
        }
        throw lerrores.push(new errores(fila,columna,"Semantico",`Vector ${id} no declarado`));
     
        // Si se encuentra, actualizar su valor
          }

    public guardarFuncion(id: string, funcion : Function){
        let env : Environment | null = this;
        if(env.funciones.has(id)){
            throw lerrores.push(new errores(funcion.line,funcion.column,"Semantico",`Funcion ${id} declarado anteriormente`));
            
        }else if(env.arreglos.has(id)){
            throw lerrores.push(new errores(funcion.line,funcion.column,"Semantico",`Arreglo ${id} declarado anteriormente`));
            
        }else if(env.variables.has(id)){
            throw lerrores.push(new errores(funcion.line,funcion.column,"Semantico",`Variable ${id} declarada anteriormente`));
        
        } 
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
    public getVector(id: string) : Vector | undefined | null {
        let env : Environment | null = this;
        while(env != null){
            if(env.arreglos.has(id)){
                return env.arreglos.get(id);
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

    public getGlobal() : Environment{  
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