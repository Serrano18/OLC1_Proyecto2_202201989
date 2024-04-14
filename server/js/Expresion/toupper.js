"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toupper = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Toupper extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.STRING) {
            return { valor: value.valor.toUpperCase(), tipo: resultado_1.TipoDato.STRING };
        }
        else {
            throw new Error('Error: El valor no es una cadena.');
        }
    }
}
exports.Toupper = Toupper;
