"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Default extends instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instruccion Default');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoDefault = (0, graphviz_1.createNode)('default');
        (0, graphviz_1.createEdge)(nodoPadre, nodoDefault);
        const nodoColon = (0, graphviz_1.createNode)(':');
        (0, graphviz_1.createEdge)(nodoPadre, nodoColon);
        const nodoInstrucciones = (0, graphviz_1.createNode)('instucciones');
        (0, graphviz_1.createEdge)(nodoPadre, nodoInstrucciones);
        for (const instruccion of this.instrucciones) {
            instruccion.crearGrafico(nodoInstrucciones);
        }
    }
    interpretar(entorno) {
        for (const instruccion of this.instrucciones) {
            try {
                const ins = instruccion.interpretar(entorno);
                if (ins != null) {
                    if (ins == "continue") {
                        continue;
                    }
                    else if (ins == "break") {
                        break;
                    }
                    else if (ins.tV == "return") {
                        return ins;
                    }
                    else {
                        throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', `Instruccion no valida dentro de Default`));
                    }
                }
            }
            catch (error) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, 'Semantico', "Error en la interpretacion de instruccion Default"));
            }
        }
    }
}
exports.Default = Default;
