"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vvector = void 0;
//solo con fila y columna obtiene un valor
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Vvector extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(id, fila, col, linea, columna) {
        super(linea, columna);
        this.fila = fila;
        this.col = col;
        this.id = id.toLowerCase();
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Valor Vector');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoId = (0, graphviz_1.createNode)(`${this.id}`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoLBracket = (0, graphviz_1.createNode)('[');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLBracket);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.fila.crearGrafico(nodoExpresion);
        const nodoRBracket = (0, graphviz_1.createNode)(']');
        (0, graphviz_1.createEdge)(nodoPadre, nodoRBracket);
        if (this.col != null) {
            const nodoLBracket2 = (0, graphviz_1.createNode)('[');
            (0, graphviz_1.createEdge)(nodoPadre, nodoLBracket2);
            const nodoExpresion2 = (0, graphviz_1.createNode)('Expresion');
            (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion2);
            this.col.crearGrafico(nodoExpresion2);
            const nodoRBracket2 = (0, graphviz_1.createNode)(']');
            (0, graphviz_1.createEdge)(nodoPadre, nodoRBracket2);
        }
    }
    interpretar(entorno) {
        const vector = entorno.obtenerVector(this.id.toLowerCase());
        const fila = this.fila.interpretar(entorno);
        if (fila.tipo != resultado_1.TipoDato.NUMBER) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El tipo de dato de la fila ${fila.valor} no es un entero`));
        }
        let col;
        if (this.col != null) {
            col = this.col.interpretar(entorno).valor;
        }
        else {
            col = 0;
        }
        if (vector == null) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `No existe el vector ${this.id}`));
        }
        return { valor: vector.getValue(fila.valor, col).value, tipo: vector.tipo };
    }
}
exports.Vvector = Vvector;
