"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const graphviz_1 = require("../graphivz/graphviz");
class Continue extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Instuccion continue');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoContinue = (0, graphviz_1.createNode)('continue');
        (0, graphviz_1.createEdge)(nodoPadre, nodoContinue);
        const nodoPuntoComa = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoPuntoComa);
    }
    interpretar(environment) {
        return "continue";
    }
}
exports.Continue = Continue;
