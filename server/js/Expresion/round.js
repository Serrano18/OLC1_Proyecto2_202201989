"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Round extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    crearGrafico(parent) {
        const parentNode = (0, graphviz_1.createNode)('Round');
        (0, graphviz_1.createEdge)(parent, parentNode);
        const reservada = (0, graphviz_1.createNode)('round');
        (0, graphviz_1.createEdge)(parentNode, reservada);
        const lParenNode = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(parentNode, lParenNode);
        const expNode = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(parentNode, expNode);
        this.valor.crearGrafico(expNode);
        const rParenNode = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(parentNode, rParenNode);
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.NUMBER || value.tipo == resultado_1.TipoDato.DOUBLE) {
            return { valor: Math.round(value.valor), tipo: resultado_1.TipoDato.NUMBER };
        }
        else {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El valor no es un número.`));
        }
    }
}
exports.Round = Round;
