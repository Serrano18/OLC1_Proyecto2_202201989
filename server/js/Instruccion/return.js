"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const graphviz_1 = require("../graphivz/graphviz");
class Return extends instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instrucción Return');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoReturn = (0, graphviz_1.createNode)('return');
        (0, graphviz_1.createEdge)(nodoPadre, nodoReturn);
        if (this.expresion != null) {
            const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
            (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
            this.expresion.crearGrafico(nodoExpresion);
        }
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        if (this.expresion != null) {
            const value = this.expresion.interpretar(entorno);
            return { line: this.line, column: this.column, tV: "return", value: value.valor, type: value.tipo };
        }
        else {
            return { line: this.line, column: this.column, tV: "return", value: null, type: resultado_1.TipoDato.NULO };
        }
    }
}
exports.Return = Return;
