import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../Abstract/expresion";
import { TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";

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
    public interpretar(entorno : Environment,consola:string[]):null{
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

        if(this.valor != null){
            const value = this.valor.interpretar(entorno);
            if(dtipo == value.tipo){
                this.id.forEach(id => {
                    entorno.guardar(id,value.valor,value.tipo,"Variable",this.line,this.column);
                })
            }else{
                throw new Error("Error: Los tipos de datos no coinciden1")
            }
        }else{
            this.id.forEach(id => {
                entorno.guardar(id,valordefecto,dtipo,"Variable",this.line,this.column);
            })
        }
        return null
    }
}