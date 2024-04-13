"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
class Instruccion {
    // Esta clase siempre pedirá línea y columna
    constructor(line, colum) {
        this.line = line;
        this.column = colum;
    }
}
exports.Instruccion = Instruccion;
