import { Instruccion } from "../Abstract/instruccion";
import { TipoDato,Resultado} from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Subebaja extends Instruccion{
    private id:string;
    private tipo:boolean;
    constructor(id:string,tipo:boolean,linea:number,columna:number){
        super(linea,columna)
        this.id=id
        this.tipo = tipo
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción Incremento o Decremento');
        createEdge(padre, nodoPadre);
        const nodoId = createNode(this.id);
        createEdge(nodoPadre, nodoId);
        const nodoIncDec = createNode(this.tipo ? '++' : '--');
        createEdge(nodoPadre, nodoIncDec);
        const nodoPuntoComa = createNode(';');
        createEdge(nodoPadre, nodoPuntoComa);
    
    }
    public interpretar(entorno : Environment): Resultado {
        const value = entorno.getVariable(this.id);
        if(value == null){
            throw lerrores.push(new errores(this.line,this.column,'Semantico',`La variable ${this.id} no existe`));
        }
        if(value.type == TipoDato.NUMBER || value.type == TipoDato.DOUBLE){
            if(this.tipo){
                entorno.editarVariable(this.id,value.value + 1,value.type,"Variable",value.fila,value.columna);
                entorno.editarVariableTablaSimbolos(this.id,value.value+1,value.type,"Variable",entorno,value.fila,value.columna);
                return {valor:value.value + 1,tipo:value.type}
            }else{
                entorno.editarVariable(this.id,value.value - 1,value.type,"Variable",value.fila,value.columna);
                entorno.editarVariableTablaSimbolos(this.id,value.value-1,value.type,"Variable",entorno,value.fila,value.columna);
                return {valor:value.value - 1,tipo:value.type}
            }
        }else{
            throw lerrores.push(new errores(this.line,this.column,'Semantico',`La variable ${this.id} no es de tipo int o double`));
        }
    }
}