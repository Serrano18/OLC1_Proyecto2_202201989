"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const symbol_1 = require("./symbol");
class Vector {
    constructor(id, tipo, nfila, ncolumna, line, column) {
        this.id = id;
        this.tipo = tipo;
        this.line = line;
        this.column = column;
        this.values = new Array(nfila);
        for (let i = 0; i < nfila; i++) {
            this.values[i] = new Array(ncolumna);
        }
    }
    getValue(fila, columna) {
        if (fila < 0 || fila >= this.values.length || columna < 0 || columna >= this.values[0].length) {
            throw new Error('Índices de fila o columna fuera de rango');
        }
        return this.values[fila][columna];
    }
    addValue(fila, columna, id, valor, tipo, line, column) {
        if (fila < 0 || fila >= this.values.length || columna < 0 || columna >= this.values[0].length) {
            throw new Error('Índices de fila o columna fuera de rango');
        }
        this.values[fila][columna] = new symbol_1.Symbol(id, tipo, valor, "Vector", line, column); // Crear un nuevo Symbol con los valores proporcionados
    }
    llenarpordefecto(id, valor, tipo, line, column) {
        for (let i = 0; i < this.values.length; i++) {
            for (let j = 0; j < this.values[i].length; j++) {
                this.values[i][j] = new symbol_1.Symbol(id, tipo, valor, "Vector", line, column);
            }
        }
    }
}
exports.Vector = Vector;
