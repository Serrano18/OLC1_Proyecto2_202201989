"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const instruccion_1 = require("../Abstract/instruccion");
class Case extends instruccion_1.Instruccion {
    constructor(expresion, instrucciones, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }
    interpretar(entorno, consola) {
        for (const instruccion of this.instrucciones) {
            try {
                const ins = instruccion.interpretar(entorno, consola);
                if (ins != null) {
                    return ins;
                }
            }
            catch (error) {
                throw new Error("Ya valio no funcioanInstrucciones");
            }
        }
    }
}
exports.Case = Case;
