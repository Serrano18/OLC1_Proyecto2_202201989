"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Case extends instruccion_1.Instruccion {
    constructor(expresion, instrucciones, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Intruccion case');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoCase = (0, graphviz_1.createNode)('case');
        (0, graphviz_1.createEdge)(nodoPadre, nodoCase);
        const nodoExp = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExp);
        this.expresion.crearGrafico(nodoExp);
        const nodoColon = (0, graphviz_1.createNode)(':');
        (0, graphviz_1.createEdge)(nodoPadre, nodoColon);
        const nodoInstrucciones = (0, graphviz_1.createNode)('Instrucciones');
        (0, graphviz_1.createEdge)(nodoPadre, nodoInstrucciones);
        for (const instruccion of this.instrucciones) {
            instruccion.crearGrafico(nodoInstrucciones);
        }
    }
    interpretar(entorno) {
        for (const instruccion of this.instrucciones) {
            try {
                const ins = instruccion.interpretar(entorno);
                if (ins != null || ins != undefined) {
                    return ins;
                }
            }
            catch (error) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `Error en case`));
            }
        }
    }
}
exports.Case = Case;
