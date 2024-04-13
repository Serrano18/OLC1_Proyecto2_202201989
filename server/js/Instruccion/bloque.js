"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const instruccion_1 = require("../Abstract/instruccion");
class Bloque extends instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }
    interpretar(consola) {
        this.instrucciones.forEach(instruccion => {
            instruccion.interpretar(consola);
        });
        return null;
    }
}
exports.Bloque = Bloque;
