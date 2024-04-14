"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_IF = void 0;
const resultado_1 = require("../../Abstract/resultado");
const instruccion_1 = require("../../Abstract/instruccion");
class FN_IF extends instruccion_1.Instruccion {
    constructor(condicion, bloqueIf, bloqueElse, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.bloqueElse = bloqueElse;
    }
    interpretar(entorno, consola) {
        const condicion = this.condicion.interpretar(entorno);
        if (condicion.tipo != resultado_1.TipoDato.BOOLEANO)
            throw Error("La condición no es booleana");
        if (condicion.valor) {
            return this.bloqueIf.interpretar(entorno, consola);
        }
        else {
            console.log("else");
            console.log({ else: this.bloqueElse });
            return this.bloqueElse.interpretar(entorno, consola);
        }
    }
}
exports.FN_IF = FN_IF;
