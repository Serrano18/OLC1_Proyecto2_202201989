import { Instruccion } from "../Abstract/instruccion"; 
import { Environment } from "../Symbol/Evironment";
import { TipoDato,Resultado } from "../Abstract/resultado"; 
import { Vfuncion } from "./valoresfuncion";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Execute extends Instruccion {

    public funcion: Vfuncion;

    constructor(funcion: Vfuncion, line: number, column: number){
        super(line, column);
        this.funcion = funcion;
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Instrucción Execute');
        createEdge(padre, nodoPadre);
        const nodoExecute = createNode('execute');
        createEdge(nodoPadre, nodoExecute);

        const nodoFunction = createNode('Valor Funcion');
        createEdge(nodoPadre, nodoFunction);
        this.funcion.crearGrafico(nodoFunction);

        const nodoPuntoComa = createNode(';');
        createEdge(nodoPadre, nodoPuntoComa);

    }
    public interpretar(entorno: Environment): Resultado {
        if (entorno.getFuncion(this.funcion.id) == null){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `La funcion ${this.funcion.id} no existe en el entorno actual`));
        } else{
            const resultado = this.funcion.interpretar(entorno);
            if (resultado != null){
                return {valor: resultado.valor, tipo: resultado.tipo}
            } else{
                return {valor: null, tipo: TipoDato.NULO};
            }
        }
    }
}