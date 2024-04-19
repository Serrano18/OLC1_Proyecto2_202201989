"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vaciarGlobalMap = exports.vaciarlerrores = exports.vaciarconsola = exports.lerrores = exports.consola = exports.globalMap = exports.errores = void 0;
class errores {
    constructor(linea, columna, tipo, mensaje) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
}
exports.errores = errores;
exports.globalMap = [];
exports.consola = [];
exports.lerrores = [];
function vaciarconsola() {
    exports.consola = [];
}
exports.vaciarconsola = vaciarconsola;
function vaciarlerrores() {
    exports.lerrores = [];
}
exports.vaciarlerrores = vaciarlerrores;
function vaciarGlobalMap() {
    exports.globalMap = [];
}
exports.vaciarGlobalMap = vaciarGlobalMap;
