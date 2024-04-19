import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
//Esta es para la declaracion tipo1 de vectores
export class Dvectores extends Instruccion{
    public tipo:string
    public id:string
    public confirTipoDato : string
    public nfila:Expresion 
    public ncol:Expresion | null
    public estado:boolean
    constructor(estado:boolean,tipo:string,id:string,confirTipoDato : string,nfila:Expresion,ncol:Expresion | null,line:number,column:number){
        super(line,column,);
        this.tipo = tipo;
        this.id = id.toLowerCase();
        this.confirTipoDato = confirTipoDato;
        this.nfila = nfila;
        this.ncol=ncol
        this.estado = estado
    }public crearGrafico(padre: any){
    const nodoPadre = createNode('Declaración Vector');
    createEdge(padre, nodoPadre);

    const nodoTipo = createNode(this.tipo);
    createEdge(nodoPadre, nodoTipo);

    const nodoId = createNode(this.estado ? `${this.id}[]` : `${this.id}[][]`);
    createEdge(nodoPadre, nodoId);

    const nodoAsignacion = createNode('=');
    createEdge(nodoPadre, nodoAsignacion);

    const nodoNuevo = createNode('new');
    createEdge(nodoPadre, nodoNuevo);

    const nodoTipo2 = createNode(this.confirTipoDato);
    createEdge(nodoPadre, nodoTipo2);

    const nodoExpresion = createNode('Expresion');
    createEdge(nodoPadre, nodoExpresion);
    this.nfila.crearGrafico(nodoExpresion);

    if (this.ncol != null){
        const nodoExpresion2 = createNode('Expresion');
        createEdge(nodoPadre, nodoExpresion2);
        this.ncol.crearGrafico(nodoExpresion2);
    }

    const nodoPuntoComa = createNode(';');
    createEdge(nodoPadre, nodoPuntoComa);
}
    public interpretar(entorno : Environment):any{
        if(this.tipo != this.confirTipoDato){
            throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${this.tipo} no coinciden con el valor asignado`));
        }
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
        const numfila = this.nfila.interpretar(entorno)
        if(this.ncol != null){
            const numcol = this.ncol.interpretar(entorno)
            if(numfila.tipo != TipoDato.NUMBER || numcol.tipo != TipoDato.NUMBER){
              throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${numfila.tipo} no es entero`));
            }
            entorno.guardarVector(this.id,dtipo,numfila.valor,numcol.valor,this.line,this.column)
            entorno.obtenerVector(this.id)?.llenarpordefecto(this.id,valordefecto,dtipo,this.line,this.column) 
            entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),numfila.valor,numcol.valor,this.line,this.column,entorno);
        }else{
            if(numfila.tipo != TipoDato.NUMBER){
                throw lerrores.push(new errores(this.line, this.column, "Semantico", `Tipo de dato ${numfila.tipo} no es entero`));
            }
            entorno.guardarVector(this.id,dtipo,numfila.valor,1,this.line,this.column)
            entorno.obtenerVector(this.id)?.llenarpordefecto(this.id,valordefecto,dtipo,this.line,this.column) 
            entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),numfila.valor,1,this.line,this.column,entorno);
        }
        
        
       
    }
}