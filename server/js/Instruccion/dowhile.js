"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
class Dowhile extends instruccion_1.Instruccion {
    constructor(condicion, bloquedo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloquedo = bloquedo;
    }
    interpretar(entorno, consola) {
        let condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
            throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
        }
        do {
            condicion = this.condicion.interpretar(entorno);
            if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
                throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
            }
            const bloquedo = this.bloquedo.interpretar(entorno, consola);
            if (bloquedo != null) {
                if (bloquedo == "continue") {
                    continue;
                }
                else if (bloquedo == "break") {
                    break;
                }
                else {
                    throw new Error("Instruccion no valida");
                }
            }
        } while (condicion.valor);
    }
}
exports.Dowhile = Dowhile;
