"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error_ = void 0;
class Error_ {
    constructor(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
}
exports.Error_ = Error_;
