import { Expresion } from "../Abstract/expresion";
import { Resultado, TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { Primitivo } from "./primitivo";
export  class Cstr extends  Expresion{ 
    public expre:Expresion
    // Esta clase siempre pedirá línea y columna
    constructor(expre:Expresion,line: number, colum:number){
        super(line,colum)
        this.expre = expre
    }
    // Método que siempre debe ejecutarse en todos los objetos que hereda
    public  interpretar(entorno : Environment):any{
        try{
            const value = this.expre.interpretar(entorno);
            if(value.tipo!=TipoDato.STRING){
                console.log("Error de tipo")
                throw new Error ( "Error de tipos")
            }
            if(value!=null){
                const cadena = value.valor
                const caracteres = [];
                for (let i = 0; i < cadena.length; i++) {
                    caracteres.push(new Primitivo(value.valor[i],TipoDato.CHAR,this.line,this.column));
                }
                return caracteres;
            }else{
                throw new Error("No se pudo Interpretar la cadena ")
            }
        }catch(e){
            console.log("Ya valio")
        }
            
        
}}