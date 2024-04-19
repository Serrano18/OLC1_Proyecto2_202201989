"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errores = void 0;
class errores {
    constructor(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
}
exports.errores = errores;
