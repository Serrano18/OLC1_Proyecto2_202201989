import { Expresion } from "../Abstract/expresion";
import { TipoDato, Resultado } from "../Abstract/resultado";
import { createEdge,createNodeColor } from "../graphivz/graphviz";
export class Primitivo extends Expresion{
    exp1:string;
    tipo: TipoDato;
    // Estos parámetros deben pasarlo en el archivo de JISON
    // En jison ustedes saber qué tipo de dato es el terminal según su gramática de expresiones
    constructor(e1:string,tipo:TipoDato,linea:number,columna:number){
        super(linea,columna)
        this.exp1 = e1;
        this.tipo = tipo;
    }
    interpretar(): Resultado {
        // Ejecutamos los noterminales
        // Comparamos el tipo
        if (TipoDato.NUMBER == this.tipo){
            return {valor:Number(this.exp1), tipo:this.tipo}
        }else if(TipoDato.DOUBLE == this.tipo){
            return {valor:Number(this.exp1), tipo:this.tipo}
        }else if(TipoDato.BOOLEANO == this.tipo) {
            return {valor:this.exp1.toLowerCase()=="true"?true:false, tipo:this.tipo}
        }else if(TipoDato.STRING == this.tipo) {
            return {valor:this.exp1.toString(), tipo:this.tipo}
        }else if(TipoDato.CHAR == this.tipo){
            return {valor:this.exp1, tipo:this.tipo}
        }

        // en caso que no sea ninguno
        return {valor:null,tipo:TipoDato.NULO}
    }

    public crearGrafico(parent: any) {
        let color = ""
        switch(this.tipo){
            case TipoDato.NUMBER:
                color = "blue";
                break;
            case TipoDato.DOUBLE:
                color = "gold"
                break
            case TipoDato.BOOLEANO:
                color = "green"
                break
            case TipoDato.STRING:
                color = "orange"
                break
            case TipoDato.CHAR:
                color = "red"
                break
            default:
                break;
        }
        createEdge(parent,createNodeColor(`${this.exp1}`, color))
    }
}