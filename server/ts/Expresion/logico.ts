import { Expresion } from "../Abstract/expresion";
import { OpLogico, Resultado, TipoDato } from "../Abstract/resultado";
import { Environment } from "../Symbol/Evironment";
import { createEdge,createNode } from "../graphivz/graphviz";
export class Logico extends Expresion{
    
    public exp1:Expresion;
    public exp2:Expresion;
    public Operacion: OpLogico;
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1:Expresion,e2:Expresion,op:OpLogico,linea:number,columna:number){
        super(linea,columna)
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2
    }
    public crearGrafico(parent: any) {
        let operacionStr = '';
        switch (this.Operacion) {
            case OpLogico.OR:
                operacionStr = ' | |';
                break;
            case OpLogico.AND:
                operacionStr = ' && ';
                break;
            case OpLogico.NOT:
                operacionStr = ' ! ';
                break;   
            default:
                break;
        }

        const parentNode = createNode('Logico');
        const operationNode = createNode(`${operacionStr}`);
        createEdge(parent, parentNode);
        createEdge(parentNode, operationNode);
        this.exp1.crearGrafico(operationNode);
        this.exp2.crearGrafico(operationNode);
    }
    public interpretar(entorno : Environment): Resultado {
        const  resultado1 =  this.exp1.interpretar(entorno)
        const resultado2 = this.exp2.interpretar(entorno) 

        if (this.Operacion== OpLogico.AND){
            if(resultado1.tipo==TipoDato.BOOLEANO && resultado2.tipo==TipoDato.BOOLEANO)
                return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor&&resultado2.valor}
        }else if (this.Operacion== OpLogico.OR){
            if(resultado1.tipo==TipoDato.BOOLEANO && resultado2.tipo==TipoDato.BOOLEANO)
                return {tipo:TipoDato.BOOLEANO,valor:resultado1.valor||resultado2.valor}
        }else if (this.Operacion== OpLogico.NOT){
            if(resultado2.tipo==TipoDato.BOOLEANO)
                return {tipo:TipoDato.BOOLEANO,valor:!resultado2.valor}
        }
        return {tipo:TipoDato.NULO,valor:null}
       }
}