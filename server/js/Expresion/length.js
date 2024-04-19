"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Length extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    crearGrafico(parent) {
        const parentNode = (0, graphviz_1.createNode)('Length');
        (0, graphviz_1.createEdge)(parent, parentNode);
        const expNode = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(parentNode, expNode);
        this.valor.crearGrafico(expNode);
        const dotNode = (0, graphviz_1.createNode)('.');
        (0, graphviz_1.createEdge)(parentNode, dotNode);
        const lengthNode = (0, graphviz_1.createNode)('length');
        (0, graphviz_1.createEdge)(parentNode, lengthNode);
        const lParenNode = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(parentNode, lParenNode);
        const rParenNode = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(parentNode, rParenNode);
        const semiColonNode = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(parentNode, semiColonNode);
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.STRING) { //es una cadena
            return { valor: value.valor.length, tipo: resultado_1.TipoDato.NUMBER };
        }
        else if (value.tipo == resultado_1.TipoDato.ID) { //si es un vector
            const vect = entorno.getVector(value.valor);
            return { valor: vect === null || vect === void 0 ? void 0 : vect.values.length, tipo: resultado_1.TipoDato.NUMBER }; //por si el valor es undefined o null
        }
        else {
            // Manejo de error si el valor no es un array o una cadena
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", ` El valor no es un vector, lista o cadena.`));
        }
    }
}
exports.Length = Length;
