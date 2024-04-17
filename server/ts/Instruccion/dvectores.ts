import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { Vector } from "../Symbol/vector";
//Esta es para la declaracion tipo1 de vectores
export class Dvectores extends Instruccion{
    public tipo:string
    public id:string
    public confirTipoDato : string
    public nfila:Expresion 
    public ncol:Expresion | null
    constructor(tipo:string,id:string,confirTipoDato : string,nfila:Expresion,ncol:Expresion | null,line:number,column:number){
        super(line,column,);
        this.tipo = tipo;
        this.id = id;
        this.confirTipoDato = confirTipoDato;
        this.nfila = nfila;
        this.ncol=ncol
    }
    public interpretar(entorno : Environment,consola:string[]):any{
        if(this.tipo != this.confirTipoDato){
            throw new Error("Ya valio jajaja")
        }
        let dtipo:TipoDato;
        let valordefecto : any;
        switch(this.tipo.toString()){
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
                throw new Error('Error: Tipo de dato invalido');
        
        }
        const numfila = this.nfila.interpretar(entorno)
        if(this.ncol != null){
            const numcol = this.ncol.interpretar(entorno)
            if(numfila.tipo != TipoDato.NUMBER || numcol.tipo != TipoDato.NUMBER){
                throw new Error ("No es un numero")

            }
            entorno.guardarVector(this.id,dtipo,numfila.valor,numcol.valor,this.line,this.column)
            entorno.obtenerVector(this.id)?.llenarpordefecto(this.id,valordefecto,dtipo,this.line,this.column) 
            entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),numfila.valor,numcol.valor,this.line,this.column,entorno);
        }else{
            if(numfila.tipo != TipoDato.NUMBER){
                throw new Error ("No es un numero")

            }
            entorno.guardarVector(this.id,dtipo,numfila.valor,1,this.line,this.column)
            entorno.obtenerVector(this.id)?.llenarpordefecto(this.id,valordefecto,dtipo,this.line,this.column) 
            entorno.guardarVectorTablaSimbolos(this.id, dtipo,entorno.obtenerVector(this.id),numfila.valor,1,this.line,this.column,entorno);
        }
        
        
       
    }
}