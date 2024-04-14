"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const instruccion_1 = require("../Abstract/instruccion");
const Evironment_1 = require("../Symbol/Evironment");
class Bloque extends instruccion_1.Instruccion {
    constructor(instrucciones, fila, columna) {
        super(fila, columna);
        this.instrucciones = instrucciones;
    }
    interpretar(entorno, consola) {
        const newEntorno = new Evironment_1.Environment(entorno);
        for (const instruct of this.instrucciones) {
            try {
                const elemento = instruct.interpretar(newEntorno, consola);
                if (elemento != null || elemento != undefined) {
                    return elemento;
                }
            }
            catch (error) {
                console.log(error);
            }
            ;
        }
        return null;
    }
}
exports.Bloque = Bloque;
