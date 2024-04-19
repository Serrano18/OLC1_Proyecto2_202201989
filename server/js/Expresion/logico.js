"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const graphviz_1 = require("../graphivz/graphviz");
class Logico extends expresion_1.Expresion {
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
            case resultado_1.OpLogico.OR:
                operacionStr = ' | |';
                break;
            case resultado_1.OpLogico.AND:
                operacionStr = ' && ';
                break;
            case resultado_1.OpLogico.NOT:
                operacionStr = ' ! ';
                break;
            default:
                break;
        }
        const parentNode = (0, graphviz_1.createNode)('Logico');
        const operationNode = (0, graphviz_1.createNode)(`${operacionStr}`);
        (0, graphviz_1.createEdge)(parent, parentNode);
        (0, graphviz_1.createEdge)(parentNode, operationNode);
        this.exp1.crearGrafico(operationNode);
        this.exp2.crearGrafico(operationNode);
    }
    interpretar(entorno) {
        const resultado1 = this.exp1.interpretar(entorno);
        const resultado2 = this.exp2.interpretar(entorno);
        if (this.Operacion == resultado_1.OpLogico.AND) {
            if (resultado1.tipo == resultado_1.TipoDato.BOOLEANO && resultado2.tipo == resultado_1.TipoDato.BOOLEANO)
                return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor && resultado2.valor };
        }
        else if (this.Operacion == resultado_1.OpLogico.OR) {
            if (resultado1.tipo == resultado_1.TipoDato.BOOLEANO && resultado2.tipo == resultado_1.TipoDato.BOOLEANO)
                return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor || resultado2.valor };
        }
        else if (this.Operacion == resultado_1.OpLogico.NOT) {
            if (resultado2.tipo == resultado_1.TipoDato.BOOLEANO)
                return { tipo: resultado_1.TipoDato.BOOLEANO, valor: !resultado2.valor };
        }
        return { tipo: resultado_1.TipoDato.NULO, valor: null };
    }
}
exports.Logico = Logico;
