"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avector = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const resultado_1 = require("../Abstract/resultado");
class Avector extends instruccion_1.Instruccion {
    constructor(id, fila, col, value, line, column) {
        super(line, column);
        this.id = id;
        this.fila = fila;
        this.col = col;
        this.value = value;
    }
    interpretar(entorno) {
        var _a, _b;
        const vector = entorno.getVector(this.id);
        const value = this.value.interpretar(entorno);
        if (vector == null) {
            throw new Error(`Vector ${this.id} doesn't exist`);
        }
        if (vector.tipo != value.tipo) {
            throw new Error(` Error: ${value.tipo} no es asiganable error de tipos ${vector.line}`);
        }
        const fila = this.fila.interpretar(entorno);
        if (this.col != null) {
            const col = this.col.interpretar(entorno);
            if (fila.tipo != resultado_1.TipoDato.NUMBER || col.tipo != resultado_1.TipoDato.NUMBER) {
                throw new Error(`Error Semantico: ${fila.tipo}no es un entero en la linea:  ${vector.line} `);
            }
            (_a = entorno.getVector(this.id)) === null || _a === void 0 ? void 0 : _a.addValue(fila.valor, col.valor, this.id, value.valor, vector.tipo, vector.line, vector.column);
            entorno.editarVectorTablaSimbolos(this.id, vector, vector.tipo, vector.line, vector.column);
        }
        else {
            if (fila.tipo != resultado_1.TipoDato.NUMBER) {
                throw new Error(`Error Semantico: ${fila.tipo} no es un entero en la linea:  ${vector.line}`);
            }
            (_b = entorno.getVector(this.id)) === null || _b === void 0 ? void 0 : _b.addValue(fila.valor, 0, this.id, value.valor, vector.tipo, vector.line, vector.column);
            entorno.editarVectorTablaSimbolos(this.id, vector, vector.tipo, vector.line, vector.column);
        }
        return null;
    }
}
exports.Avector = Avector;
