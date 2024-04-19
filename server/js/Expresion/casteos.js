"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Casteo extends expresion_1.Expresion {
    constructor(tipo, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        const tip = this.tipo;
        switch (tip) {
            case 'int':
                switch (value.tipo) {
                    case resultado_1.TipoDato.DOUBLE:
                        return { valor: parseInt(value.valor), tipo: resultado_1.TipoDato.NUMBER };
                    case resultado_1.TipoDato.CHAR:
                        return { valor: value.valor, tipo: resultado_1.TipoDato.NUMBER };
                    default:
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a entero`));
                }
            case 'double':
                switch (value.tipo) {
                    case resultado_1.TipoDato.NUMBER:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: resultado_1.TipoDato.DOUBLE };
                    case resultado_1.TipoDato.STRING:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: resultado_1.TipoDato.DOUBLE };
                    default:
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a double`));
                }
            case 'char':
                switch (value.tipo) {
                    case resultado_1.TipoDato.NUMBER:
                        return { valor: String.fromCharCode(value.valor), tipo: resultado_1.TipoDato.CHAR };
                    default:
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a char`));
                }
            case 'std::string':
                switch (value.tipo) {
                    case resultado_1.TipoDato.NUMBER:
                        return { valor: value.valor.toString(), tipo: resultado_1.TipoDato.STRING };
                    case resultado_1.TipoDato.DOUBLE:
                        return { valor: value.valor.toString(), tipo: resultado_1.TipoDato.STRING };
                    default:
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${value.tipo} no valido para la conversion a string`));
                }
            default:
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `tipo dato ${tip} no valido para la conversion`));
        }
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Casteo');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoTipo = (0, graphviz_1.createNode)(`${this.tipo}`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoTipo);
        const nodoLParen = (0, graphviz_1.createNode)('(');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLParen);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.valor.crearGrafico(nodoExpresion);
        const nodoRParen = (0, graphviz_1.createNode)(')');
        (0, graphviz_1.createEdge)(nodoPadre, nodoRParen);
    }
}
exports.Casteo = Casteo;
