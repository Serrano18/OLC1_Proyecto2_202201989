"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tolower = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Tolower extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    crearGrafico(parent) {
        const parentNode = (0, graphviz_1.createNode)('toLower');
        (0, graphviz_1.createEdge)(parent, parentNode);
        const reservada = (0, graphviz_1.createNode)('toupper');
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
        if (value.tipo == resultado_1.TipoDato.STRING) {
            return { valor: value.valor.toLowerCase(), tipo: resultado_1.TipoDato.STRING };
        }
        else {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El valor ${value.valor} no es una cadena.`));
        }
    }
}
exports.Tolower = Tolower;
