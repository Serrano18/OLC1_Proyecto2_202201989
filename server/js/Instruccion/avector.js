"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avector = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
const Tablasimbolos_1 = require("../Tablasimbolos");
const graphviz_1 = require("../graphivz/graphviz");
class Avector extends instruccion_1.Instruccion {
    constructor(id, fila, col, value, line, column) {
        super(line, column);
        this.id = id.toLowerCase();
        this.fila = fila;
        this.col = col;
        this.value = value;
    }
    crearGrafico(padre) {
        const nodoPadre = (0, graphviz_1.createNode)('Nuevo Valor Vector');
        (0, graphviz_1.createEdge)(padre, nodoPadre);
        const nodoId = (0, graphviz_1.createNode)(`${this.id}`);
        (0, graphviz_1.createEdge)(nodoPadre, nodoId);
        const nodoLBracket = (0, graphviz_1.createNode)('[');
        (0, graphviz_1.createEdge)(nodoPadre, nodoLBracket);
        const nodoExpresion1 = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion1);
        this.fila.crearGrafico(nodoExpresion1);
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
        const nodoEqual = (0, graphviz_1.createNode)('=');
        (0, graphviz_1.createEdge)(nodoPadre, nodoEqual);
        const nodoExpresion = (0, graphviz_1.createNode)('Expresion');
        (0, graphviz_1.createEdge)(nodoPadre, nodoExpresion);
        this.value.crearGrafico(nodoExpresion);
        const nodoSemicolon = (0, graphviz_1.createNode)(';');
        (0, graphviz_1.createEdge)(nodoPadre, nodoSemicolon);
    }
    interpretar(entorno) {
        var _a, _b;
        const vector = entorno.getVector(this.id);
        const value = this.value.interpretar(entorno);
        if (vector == null) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El vector ${this.id} no existe`));
        }
        if (vector.tipo != value.tipo) {
            throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El tipo de dato ${value.tipo} no es asignable al vector ${this.id}`));
        }
        const fila = this.fila.interpretar(entorno);
        if (this.col != null) {
            const col = this.col.interpretar(entorno);
            if (fila.tipo != resultado_1.TipoDato.NUMBER || col.tipo != resultado_1.TipoDato.NUMBER) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El tipo de dato de la fila o columna no es un entero`));
            }
            (_a = entorno.getVector(this.id)) === null || _a === void 0 ? void 0 : _a.addValue(fila.valor, col.valor, this.id, value.valor, vector.tipo, vector.line, vector.column);
            entorno.editarVectorTablaSimbolos(this.id, vector, vector.tipo, vector.line, vector.column);
        }
        else {
            if (fila.tipo != resultado_1.TipoDato.NUMBER) {
                throw Tablasimbolos_1.lerrores.push(new Tablasimbolos_1.errores(this.line, this.column, "Semantico", `El tipo de dato de la fila no es un entero`));
            }
            (_b = entorno.getVector(this.id)) === null || _b === void 0 ? void 0 : _b.addValue(fila.valor, 0, this.id, value.valor, vector.tipo, vector.line, vector.column);
            entorno.editarVectorTablaSimbolos(this.id, vector, vector.tipo, vector.line, vector.column);
        }
        return null;
    }
}
exports.Avector = Avector;
