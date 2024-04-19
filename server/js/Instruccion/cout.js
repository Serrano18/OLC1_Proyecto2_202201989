"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cout = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Cout extends instruccion_1.Instruccion {
    constructor(expresion, salto, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.salto = salto;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instruccion Cout');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoCout = (0, graphviz_1.createNode)('cout');
        (0, graphviz_1.createEdge)(nodoPadre, nodoCout);
        const nodoMenos = (0, graphviz_1.createNode)('<<');
        (0, graphviz_1.createEdge)(nodoPadre, nodoMenos);
        const nodoExp = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExp);
        this.expresion.crearGrafico(nodoExp);
        if (this.salto) {
            const nodoSMenos = (0, graphviz_1.createNode)('<<');
            const nodoSEndl = (0, graphviz_1.createNode)('endl');
            (0, graphviz_1.createEdge)(nodoPadre, nodoSMenos);
            (0, graphviz_1.createEdge)(nodoPadre, nodoSEndl);
        }
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(entorno) {
        const res = this.expresion.interpretar(entorno);
        if (res == undefined) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error en la expresion de cout undefined`));
        }
        if (res.tipo == resultado_1.TipoDato.BOOLEANO) {
            res.valor == res.valor ? true : false;
        }
        if (this.salto) {
            Tablasimbolos_1.consola.push(res.valor + "\n");
        }
        else {
            Tablasimbolos_1.consola.push(res.valor + "");
        }
        return null;
    }
}
exports.Cout = Cout;
