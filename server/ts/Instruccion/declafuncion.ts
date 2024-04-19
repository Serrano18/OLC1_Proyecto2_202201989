import { Instruccion } from "../Abstract/instruccion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { Bloque } from "./bloque";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Function extends Instruccion{
    public id : string;
    public tipostring : string;
    public parametros : {tipo:string, id:string,vect:boolean,vsimple:boolean}[];
    public bloque : Bloque;
    public tipo : TipoDato;

    constructor(id:string,tipostring:string, parametros:{tipo:string, id:string,vect:boolean,vsimple:boolean}[],bloque:Bloque, line:number, column:number){
        super(line, column);
        this.id = id.toLowerCase();
        this.parametros = parametros
        this.bloque =  bloque
        this.tipo = TipoDato.NULO;
        this.tipostring = tipostring;
    }
    public crearGrafico(padre: any){
        const nodoPadre = createNode('Declaración Funcion');
        createEdge(padre, nodoPadre);
        const nodoTipo = createNode(this.tipostring);
        createEdge(nodoPadre, nodoTipo);
        const nodoId = createNode(this.id);
        createEdge(nodoPadre, nodoId);
        const nodoLParen = createNode('(');
        createEdge(nodoPadre, nodoLParen);
        if (this.parametros.length != 0){
            for (let i = 0; i < this.parametros.length; i++){
                const nodoFirst = createNode('Parametros');
                createEdge(nodoPadre, nodoFirst);
    
                const nodoTipo = createNode(this.parametros[i].tipo);
                createEdge(nodoFirst, nodoTipo);
    
                let nodoId;
                if (this.parametros[i].vect){
                    if (this.parametros[i].vsimple){
                        nodoId = createNode(`${this.parametros[i].id}[]`);
                    } else{
                        nodoId = createNode(`${this.parametros[i].id}[][]`);
                    }
                } else{
                    nodoId = createNode(this.parametros[i].id);
                }
                createEdge(nodoFirst, nodoId);
    
                if (i < this.parametros.length - 1){
                    const nodoComa = createNode(',');
                    createEdge(nodoPadre, nodoComa);
                }
            }
        }
    
        const nodoRParen = createNode(')');
        createEdge(nodoPadre, nodoRParen);
    
        const nodoBloque = createNode('Bloque');
        createEdge(nodoPadre, nodoBloque);
        this.bloque.crearGrafico(nodoBloque);
    
    }
    public interpretar(environment : Environment) {
        let dtipo:TipoDato;
        
        switch(this.tipostring.toLowerCase()){
            case "int":
                dtipo = TipoDato.NUMBER;
                break;
            case "double":
                dtipo = TipoDato.DOUBLE;
                break;
            case "char":
                dtipo = TipoDato.CHAR;
                break;
            case "std::string":
                dtipo=TipoDato.STRING;
                break;
            case "bool":
                dtipo=TipoDato.BOOLEANO;
                break;
            case "void":
                dtipo = TipoDato.NULO
                break;
            default:
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipostring} no valido`));
        }
        this.tipo = dtipo;
        environment.guardarFuncion(this.id, this);
    }
}