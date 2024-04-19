"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Typeof extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    crearGrafico(parent) {
        const parentNode = (0, graphviz_1.createNode)('Typeof');
        (0, graphviz_1.createEdge)(parent, parentNode);
        const typeofNode = (0, graphviz_1.createNode)('typeof');
        (0, graphviz_1.createEdge)(parentNode, typeofNode);
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
        if (value.tipo == resultado_1.TipoDato.NUMBER) {
            return { valor: 'int', tipo: resultado_1.TipoDato.STRING };
        }
        else if (value.tipo == resultado_1.TipoDato.BOOLEANO) {
            return { valor: 'bool', tipo: resultado_1.TipoDato.STRING };
        }
        else if (value.tipo == resultado_1.TipoDato.STRING) {
            return { valor: 'std::string', tipo: resultado_1.TipoDato.STRING };
        }
        else if (value.tipo == resultado_1.TipoDato.DOUBLE) {
            return { valor: 'double', tipo: resultado_1.TipoDato.STRING };
        }
        else if (value.tipo == resultado_1.TipoDato.CHAR) {
            return { valor: 'char', tipo: resultado_1.TipoDato.STRING };
        }
        else if (value.tipo == resultado_1.TipoDato.NULO) {
            return { valor: 'null', tipo: resultado_1.TipoDato.STRING };
        }
        else {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El tipo de valor ${value.tipo} no es valido en el lenguaje.`));
        }
    }
    isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
}
exports.Typeof = Typeof;
