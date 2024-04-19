"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Relacional extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    crearGrafico(parent) {
        let operacionStr = '';
        switch (this.Operacion) {
            case resultado_1.OpRelacional.IGUAL:
                operacionStr = ' ==';
                break;
            case resultado_1.OpRelacional.DISTINTO:
                operacionStr = ' !=';
                break;
            case resultado_1.OpRelacional.MAYOR:
                operacionStr = ' > ';
                break;
            case resultado_1.OpRelacional.MAYOR:
                operacionStr = ' > ';
                break;
            case resultado_1.OpRelacional.MENOR:
                operacionStr = '< ';
                break;
            case resultado_1.OpRelacional.MAYORIGUAL:
                operacionStr = ' >= ';
                break;
            case resultado_1.OpRelacional.MENORIGUAL:
                operacionStr = ' <=';
                break;
            default:
                break;
        }
        const parentNode = (0, graphviz_1.createNode)('Relacional');
        const operationNode = (0, graphviz_1.createNode)(`${operacionStr}`);
        (0, graphviz_1.createEdge)(parent, parentNode);
        (0, graphviz_1.createEdge)(parentNode, operationNode);
        this.exp1.crearGrafico(operationNode);
        this.exp2.crearGrafico(operationNode);
    }
    interpretar(entorno) {
        const resultado1 = this.exp1.interpretar(entorno);
        const resultado2 = this.exp2.interpretar(entorno);
        //console.log(resultado1.valor,resultado2.valor) 
        if (resultado1.tipo == resultado_1.TipoDato.NULO || resultado2.tipo == resultado_1.TipoDato.NULO) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", "Los tipos en la operacion relacional no son correctos"));
        }
        if ((resultado1.tipo == resultado_1.TipoDato.NUMBER || resultado1.tipo == resultado_1.TipoDato.DOUBLE || resultado1.tipo == resultado_1.TipoDato.CHAR || resultado1.tipo == resultado_1.TipoDato.STRING
            &&
                resultado2.tipo == resultado_1.TipoDato.NUMBER || resultado2.tipo == resultado_1.TipoDato.DOUBLE || resultado2.tipo == resultado_1.TipoDato.CHAR || resultado2.tipo == resultado_1.TipoDato.STRING) || (resultado1.tipo == resultado_1.TipoDato.BOOLEANO && resultado2.tipo == resultado_1.TipoDato.BOOLEANO)) {
            switch (this.Operacion) {
                case resultado_1.OpRelacional.IGUAL:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor == resultado2.valor };
                case resultado_1.OpRelacional.DISTINTO:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor != resultado2.valor };
                case resultado_1.OpRelacional.MENOR:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor < resultado2.valor };
                case resultado_1.OpRelacional.MENORIGUAL:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor <= resultado2.valor };
                case resultado_1.OpRelacional.MAYOR:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor > resultado2.valor };
                case resultado_1.OpRelacional.MAYORIGUAL:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor >= resultado2.valor };
            }
        }
        return { tipo: resultado_1.TipoDato.NULO, valor: null };
    }
}
exports.Relacional = Relacional;
