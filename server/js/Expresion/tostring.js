"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tostring = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Tostring extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    crearGrafico(parent) {
        const parentNode = (0, graphviz_1.createNode)('Tostring');
        (0, graphviz_1.createEdge)(parent, parentNode);
        const reservada = (0, graphviz_1.createNode)('std::tostring');
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
        if (value.tipo == resultado_1.TipoDato.NUMBER || value.tipo == resultado_1.TipoDato.DOUBLE || value.tipo == resultado_1.TipoDato.BOOLEANO) {
            return { valor: value.valor.toString(), tipo: resultado_1.TipoDato.STRING };
        }
        else {
            // Manejo de error si el valor no es un número o booleano
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El tipo ${value.tipo} no es valido para convertir a cadena.`));
        }
    }
}
exports.Tostring = Tostring;
