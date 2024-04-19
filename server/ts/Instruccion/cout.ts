import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Instruccion } from "../Abstract/instruccion";
import { Environment } from "../Symbol/Evironment";
import { consola,lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";

export class Cout extends Instruccion{
    private expresion;
    private salto;
    constructor(expresion:Expresion,salto:string,linea:number,columna:number){
        super(linea,columna)
        this.expresion=expresion
        this.salto = salto
    }
    public crearGrafico(padre: any){
            const nodoPadre = createNode('Instruccion Cout');
            createEdge(padre, nodoPadre);
        
            const nodoCout = createNode('cout');
            createEdge(nodoPadre, nodoCout);
        
            const nodoMenos = createNode('<<');
            createEdge(nodoPadre, nodoMenos);
        
            const nodoExp = createNode('Expresion');
            createEdge(nodoPadre, nodoExp);
            this.expresion.crearGrafico(nodoExp);
        
            if (this.salto){
                const nodoSMenos = createNode('<<');
                const nodoSEndl = createNode('endl');
                createEdge(nodoPadre, nodoSMenos);
                createEdge(nodoPadre, nodoSEndl);
            }
        
            const nodoPuntoComa = createNode(';');
            createEdge(nodoPadre, nodoPuntoComa);
        
    }
    public interpretar(entorno : Environment): null {
        const res = this.expresion.interpretar(entorno)
        if(res == undefined){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Error en la expresion de cout undefined`));
         }
        if (res.tipo == TipoDato.BOOLEANO){
            res.valor == res.valor?true:false;
        }
        if (this.salto){
        consola.push(res.valor+"\n");
        }
        else{
        consola.push(res.valor+"");
        }
        return null
    }
}