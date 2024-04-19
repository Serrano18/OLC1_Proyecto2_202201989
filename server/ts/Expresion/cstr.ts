import { Expresion } from "../Abstract/expresion";
import { Resultado, TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { Primitivo } from "./primitivo";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";

export  class Cstr extends  Expresion{ 
    public expre:Expresion
    // Esta clase siempre pedirá línea y columna
    constructor(expre:Expresion,line: number, colum:number){
        super(line,colum)
        this.expre = expre
    }
    public crearGrafico(padre: any) {
        const nodoPadre = createNode('C_str');
        createEdge(padre, nodoPadre);
    
        const nodoExpresion = createNode('Expresion');
        createEdge(nodoPadre, nodoExpresion);
        this.expre.crearGrafico(nodoExpresion);
    
        const nodoPunto = createNode('.');
        createEdge(nodoPadre, nodoPunto);
    
        const nodoC_str = createNode('c_str');
        createEdge(nodoPadre, nodoC_str);
    
        const nodoLParen = createNode('(');
        createEdge(nodoPadre, nodoLParen);
    
        const nodoRParen = createNode(')');
        createEdge(nodoPadre, nodoRParen);
    }
    // Método que siempre debe ejecutarse en todos los objetos que hereda
    public  interpretar(entorno : Environment):Resultado{
        try{
            const value = this.expre.interpretar(entorno);
            if(value.tipo!=TipoDato.STRING){
                throw lerrores.push(new errores(this.line,this.column,"Semantico","Error de tipos en la funcion CSTR"))
            }
            if(value!=null){
                const cadena = value.valor
                const caracteres: Expresion[] = [];
                for (let i = 0; i < cadena.length; i++) {
                    caracteres.push(new Primitivo(value.valor[i],TipoDato.CHAR,this.line,this.column));
                }
                return {valor: caracteres, tipo: TipoDato.CHAR};
            }else{
                throw lerrores.push(new errores(this.line,this.column,"Semantico","El valor es nulo en la funcion CSTR"))
                
            }
        }catch(e){
            throw lerrores.push(new errores(this.line,this.column,"Semantico","Error en la funcion CSTR"))
        }     
}}