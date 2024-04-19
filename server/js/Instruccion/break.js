"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const graphviz_1 = require("../graphivz/graphviz");
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instruccion Break');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoBreak = (0, graphviz_1.createNode)('break');
        (0, graphviz_1.createEdge)(nodoPadre, nodoBreak);
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(environment) {
        return "break";
    }
}
exports.Break = Break;
