import { Instruccion } from "../Abstract/instruccion"; 
import { Expresion } from "../Abstract/expresion";
import { Environment } from "../Symbol/Evironment"; 
import { TipoDato } from "../Abstract/resultado"; 
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Avector extends Instruccion{

        private id: string;
        private fila: Expresion;
        private col: Expresion | null;
        private value: Expresion;

        constructor(id: string, fila: Expresion, col: Expresion | null, value: Expresion, line: number, column: number){
            super(line, column);
            this.id = id.toLowerCase();
            this.fila = fila;
            this.col = col;
            this.value = value;
        }
        public crearGrafico(padre: any){
            const nodoPadre = createNode('Nuevo Valor Vector');
            createEdge(padre, nodoPadre);
        
            const nodoId = createNode(`${this.id}`);
            createEdge(nodoPadre, nodoId);
        
            const nodoLBracket = createNode('[');
            createEdge(nodoPadre, nodoLBracket);
        
            const nodoExpresion1 = createNode('Expresion');
            createEdge(nodoPadre, nodoExpresion1);
            this.fila.crearGrafico(nodoExpresion1);
        
            const nodoRBracket = createNode(']');
            createEdge(nodoPadre, nodoRBracket);
        
            if (this.col != null) {
                const nodoLBracket2 = createNode('[');
                createEdge(nodoPadre, nodoLBracket2);
        
                const nodoExpresion2 = createNode('Expresion');
                createEdge(nodoPadre, nodoExpresion2);
                this.col.crearGrafico(nodoExpresion2);
        
                const nodoRBracket2 = createNode(']');
                createEdge(nodoPadre, nodoRBracket2);
            }
        
            const nodoEqual = createNode('=');
            createEdge(nodoPadre, nodoEqual);
        
            const nodoExpresion = createNode('Expresion');
            createEdge(nodoPadre, nodoExpresion);
            this.value.crearGrafico(nodoExpresion);
        
            const nodoSemicolon = createNode(';');
            createEdge(nodoPadre, nodoSemicolon);
        }
        public interpretar(entorno: Environment): null {
            const vector = entorno.getVector(this.id);
            const value = this.value.interpretar(entorno);
            if (vector == null) {
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `El vector ${this.id} no existe`));
            }

            if (vector.tipo != value.tipo){
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `El tipo de dato ${value.tipo} no es asignable al vector ${this.id}`));
            }

            const fila = this.fila.interpretar(entorno);

            if (this.col != null){
                const col = this.col.interpretar(entorno);
                if (fila.tipo != TipoDato.NUMBER || col.tipo != TipoDato.NUMBER){
                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `El tipo de dato de la fila o columna no es un entero`));  
                    
                }
                entorno.getVector(this.id)?.addValue(fila.valor,col.valor,this.id,value.valor, vector.tipo, vector.line, vector.column)
                entorno.editarVectorTablaSimbolos(this.id,vector,vector.tipo,vector.line,vector.column)
            } else {
                if (fila.tipo != TipoDato.NUMBER){
                    throw lerrores.push(new errores(this.line, this.column, "Semantico", `El tipo de dato de la fila no es un entero`));
                }
                entorno.getVector(this.id)?.addValue(fila.valor, 0,this.id, value.valor, vector.tipo,vector.line, vector.column)
                entorno.editarVectorTablaSimbolos(this.id,vector,vector.tipo,vector.line,vector.column)
            }
            return null
        }
}