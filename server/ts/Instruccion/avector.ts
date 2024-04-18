import { Instruccion } from "../Abstract/instruccion"; 
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment"; 
import { TipoDato } from "../Abstract/resultado"; 

export class Avector extends Instruccion{

        private id: string;
        private fila: Expresion;
        private col: Expresion | null;
        private value: Expresion;

        constructor(id: string, fila: Expresion, col: Expresion | null, value: Expresion, line: number, column: number){
            super(line, column);
            this.id = id;
            this.fila = fila;
            this.col = col;
            this.value = value;
        }

        public interpretar(entorno: Environment): null {
            const vector = entorno.getVector(this.id);
            const value = this.value.interpretar(entorno);
            if (vector == null) {
                throw new Error(`Vector ${this.id} doesn't exist`);
            }

            if (vector.tipo != value.tipo){
                throw new Error(` Error: ${value.tipo} no es asiganable error de tipos ${vector.line}`)
            }

            const fila = this.fila.interpretar(entorno);

            if (this.col != null){
                const col = this.col.interpretar(entorno);
                if (fila.tipo != TipoDato.NUMBER || col.tipo != TipoDato.NUMBER){
                    throw new Error(`Error Semantico: ${fila.tipo}no es un entero en la linea:  ${vector.line} `)
                }
                entorno.getVector(this.id)?.addValue(fila.valor,col.valor,this.id,value.valor, vector.tipo, vector.line, vector.column)
                entorno.editarVectorTablaSimbolos(this.id,vector,vector.tipo,vector.line,vector.column)
            } else {
                if (fila.tipo != TipoDato.NUMBER){
                    throw new Error(`Error Semantico: ${fila.tipo} no es un entero en la linea:  ${vector.line}`)
                }
                entorno.getVector(this.id)?.addValue(fila.valor, 0,this.id, value.valor, vector.tipo,vector.line, vector.column)
                entorno.editarVectorTablaSimbolos(this.id,vector,vector.tipo,vector.line,vector.column)
            }
            return null
        }
}