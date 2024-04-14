"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tolower = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Tolower extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.STRING) {
            return { valor: value.valor.toLowerCase(), tipo: resultado_1.TipoDato.STRING };
        }
        else {
            throw new Error('Error: El valor no es una cadena.');
        }
    }
}
exports.Tolower = Tolower;
