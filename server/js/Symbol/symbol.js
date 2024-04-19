"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = void 0;
class Symbol {
    constructor(id, type, value, type2, fila, columna) {
        this.id = id.toLowerCase();
        this.type = type;
        this.type2 = type2;
        this.value = value;
        this.fila = fila;
        this.columna = columna;
    }
}
exports.Symbol = Symbol;
