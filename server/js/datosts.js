"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datosts = void 0;
class Datosts {
    constructor(id, type, value, type2, entorno, fila, columna) {
        this.id = id.toLowerCase();
        this.type = type;
        this.type2 = type2;
        this.value = value;
        this.entorno = entorno;
        this.fila = fila;
        this.columna = columna;
    }
}
exports.Datosts = Datosts;
