"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
class While extends instruccion_1.Instruccion {
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
        while (condicion.valor) {
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
            condicion = this.condicion.interpretar(entorno);
            if (condicion.tipo != resultado_1.TipoDato.BOOLEANO) {
                throw new Error("EL CICLO NO VA A FUNCIONAR CONDICION ERRONEA");
            }
        }
    }
}
exports.While = While;
