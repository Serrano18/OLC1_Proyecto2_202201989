import { Instruccion } from "../Abstract/instruccion";
import { TipoDato } from "../Abstract/resultado";
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Avariable extends Instruccion{
    private id:string;
    private valor:Expresion|null;
    constructor(id:string,valor:Expresion|null,linea:number,columna:number){
        super(linea,columna)
        this.id=id.toLowerCase()
        this.valor = valor
    }
    public crearGrafico(padre: any) {
        const nodoPadre = createNode('Actualizar Valor');
        createEdge(padre, nodoPadre);
    
        const nodoId = createNode(`${this.id}`);
        createEdge(nodoPadre, nodoId);
    
        const nodoAssign = createNode('=');
        createEdge(nodoPadre, nodoAssign);
    
        const nodoExpresion = createNode('Expresion');
        createEdge(nodoPadre, nodoExpresion);
        this.valor?.crearGrafico(nodoExpresion);
    
        const nodopyc = createNode(';');
        createEdge(nodoPadre, nodopyc);
    }

    //Esto es la asignacion tengo que crear la validacion para que pueda igualar vectores solo si son del mismo tamaño
    public interpretar(entorno : Environment): null {
        const value = entorno.getVariable(this.id.toLowerCase());
        if(value == null){
            const vector = entorno.getVector(this.id.toLowerCase())
            if(vector == null){
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `La variable o vector ${this.id} no existe`));
            }else{
                if (this.valor == null){
                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `La variable o vector ${this.id} no existe`));
                }else{
                    if(this.valor!= null){
                        const valor = this.valor.interpretar(entorno);
                        if(valor.tipo == TipoDato.ID){
                            const vector2 = entorno.getVector(valor.valor);
                            if (vector2 == null) {
                                throw lerrores.push(new errores(this.line, this.column, "Semantico", `El vector ${this.id} no existe`));
                            } else {
                                if (vector.values.length != vector2.values.length || vector.values[0].length != vector2.values[0].length) {
                                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `El vector ${this.id} no tiene las mismas dimensiones que ${vector2.id}`));
                                } else{
                                    entorno.getVector(this.id.toLowerCase())?.setVector(vector2.values);
                                    entorno.editarVectorTablaSimbolos(this.id.toLowerCase(),vector2,vector.tipo,vector.line,vector.column)
                                }
                            }      
                                    
                        }else{
                            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tiopos de datos no coinciden con el vector ${this.id}`));
                        }
                    }else{
                        throw lerrores.push(new errores(this.line, this.column, "Semantico", `El valor asignado es null`));
                    }
                }
            }
        }else {
            if (this.valor != null){
                const valor = this.valor.interpretar(entorno);
                if(value.type == valor.tipo){
                    entorno.editarVariable(this.id.toLowerCase(),valor.valor,valor.tipo,"variable",value.fila,value.columna);
                    entorno.editarVariableTablaSimbolos(this.id.toLowerCase(),valor.valor,valor.tipo,"Variable",entorno,value.fila,value.columna);
                }else{
                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `Los tipos de datos no coinciden con la variable ${this.id}`));
                }
            }else{
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `El valor asignado es null`));
            }
        }
        return null;
    }
}