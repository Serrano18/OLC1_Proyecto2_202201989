import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Dvariables extends Instruccion{
    private tipo: string;
    private id: string[];
    private valor: Expresion | null;

    constructor(tipo:string,id:string[],valor:Expresion|null,line:number,column:number){
        super(line,column);
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Declaración');
        createEdge(padre, nodoPadre);
    
        const nodoTipo = createNode(this.tipo);
        createEdge(nodoPadre, nodoTipo);
    
        for (let i = 0; i < this.id.length; i++){
            const nodoId = createNode(this.id[i]);
            createEdge(nodoPadre, nodoId);
    
            if (i < this.id.length - 1){
                const nodoComa = createNode(',');
                createEdge(nodoPadre, nodoComa);
            }
        }
    
        if (this.valor != null){
            const nodoIgual = createNode('=');
            createEdge(nodoPadre, nodoIgual);
    
            const nodoExpresion = createNode('Expresion');
            createEdge(nodoPadre, nodoExpresion);
            this.valor.crearGrafico(nodoExpresion);
        }
    
        const nodoPuntoComa = createNode(';');
        createEdge(nodoPadre, nodoPuntoComa);
    
    }
    public interpretar(entorno : Environment):any{
        let dtipo:TipoDato;
        let valordefecto : any;
        switch(this.tipo.toLowerCase()){
            case "int":
                dtipo = TipoDato.NUMBER;
                valordefecto = Number(0);
                break;
            case "double":
                dtipo = TipoDato.DOUBLE;
                valordefecto = Number(0.0);
                break;
            case "char":
                dtipo = TipoDato.CHAR;
                valordefecto = '0';
                break;
            case "std::string":
                dtipo=TipoDato.STRING;
                valordefecto = "";
                break;
            case "bool":
                dtipo=TipoDato.BOOLEANO;
                valordefecto = true;
                break
            default:
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no valido`));
        
        }

        if(this.valor != null){
            const value = this.valor.interpretar(entorno);
            if(dtipo == value.tipo){
                this.id.forEach(id => {
                    entorno.guardar(id.toLowerCase(),value.valor,value.tipo,"Variable",this.line,this.column);
                    entorno.guardarVariablesTablaSimbolos(id.toLowerCase(),value.valor,value.tipo,"Variable",entorno,this.line,this.column);
                })
            }else{
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
            }
        }else{
            this.id.forEach(id => {
                entorno.guardar(id.toLowerCase(),valordefecto,dtipo,"Variable",this.line,this.column);
                entorno.guardarVariablesTablaSimbolos(id.toLowerCase(),valordefecto,dtipo,"Variable",entorno,this.line,this.column);
            })
        }
    }
}