import { Expresion } from "../Abstract/expresion";
import { OpRelacional, Resultado, TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { lerrores,errores } from "../Tablasimbolos";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Relacional extends Expresion{
    public exp1:Expresion;
    public exp2:Expresion;
    public Operacion: OpRelacional;
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1:Expresion,e2:Expresion,op:OpRelacional,linea:number,columna:number){
        super(linea,columna)
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2
    }
    public crearGrafico(parent: any) {
        let operacionStr = '';
        switch (this.Operacion) {
            case OpRelacional.IGUAL:
                operacionStr = ' ==';
                break;
            case OpRelacional.DISTINTO:
                operacionStr = ' !=' 
                break;
            case OpRelacional.MAYOR:
                operacionStr = ' > ';
                break; 
                 case OpRelacional.MAYOR:
                operacionStr = ' > ';
                break;   
            case OpRelacional.MENOR:
                operacionStr = '< ';
                break;   
            case OpRelacional.MAYORIGUAL:
                operacionStr = ' >= ';
                break;   
            case OpRelacional.MENORIGUAL:
                operacionStr = ' <=';
                break;    
            default:
                break;
        }

        const parentNode = createNode('Relacional');
        const operationNode = createNode(`${operacionStr}`);
        createEdge(parent, parentNode);
        createEdge(parentNode, operationNode);
        this.exp1.crearGrafico(operationNode);
        this.exp2.crearGrafico(operationNode);
    }
    public interpretar(entorno : Environment): Resultado {
        const resultado1 = this.exp1.interpretar(entorno)
        const resultado2 = this.exp2.interpretar(entorno)
        //console.log(resultado1.valor,resultado2.valor) 
        if(resultado1.tipo==TipoDato.NULO || resultado2.tipo==TipoDato.NULO){
            throw lerrores.push(new errores(this.line,this.column,"Semantico","Los tipos en la operacion relacional no son correctos"))
        }
        if(
            (resultado1.tipo==TipoDato.NUMBER || resultado1.tipo==TipoDato.DOUBLE || resultado1.tipo==TipoDato.CHAR || resultado1.tipo == TipoDato.STRING
            &&
            resultado2.tipo==TipoDato.NUMBER || resultado2.tipo==TipoDato.DOUBLE || resultado2.tipo==TipoDato.CHAR || resultado2.tipo == TipoDato.STRING
            ) || (resultado1.tipo==TipoDato.BOOLEANO && resultado2.tipo==TipoDato.BOOLEANO)
        ){
            switch (this.Operacion){
                case OpRelacional.IGUAL:
                    return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor==resultado2.valor}
                case OpRelacional.DISTINTO:
                    return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor!=resultado2.valor}
                case OpRelacional.MENOR:
                    return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor<resultado2.valor}
                case OpRelacional.MENORIGUAL:
                    return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor<=resultado2.valor}
                case OpRelacional.MAYOR:
                    return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor>resultado2.valor}
                case OpRelacional.MAYORIGUAL:
                    return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor>=resultado2.valor}
            }
        }
            return {tipo:TipoDato.NULO,valor:null}

    }

}