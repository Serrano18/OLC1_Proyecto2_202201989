import { Expresion } from "../Abstract/expresion";
import { Resultado, TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Valorid extends Expresion{

    constructor(private id:string,line:number,column:number){
        super(line,column);
    }
    public crearGrafico(padre: any) {
        const nodoPadre = createNode('Valor Id');
        createEdge(padre, nodoPadre);
        const nodoId = createNode(`${this.id}`);
        createEdge(nodoPadre, nodoId);
    }
    public interpretar(entorno : Environment) : Resultado{

        const value = entorno.getVariable(this.id.toLowerCase());
        if(value != null){
            return {valor: value.value,tipo:value.type}
        }else{
            const arreglo = entorno.getVector(this.id.toLowerCase())
            if(arreglo!= null){
                return{valor: arreglo.id,tipo:TipoDato.ID}
            }else{
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `La variable o vector ${this.id} no existe`));
            }
        }
    }

}