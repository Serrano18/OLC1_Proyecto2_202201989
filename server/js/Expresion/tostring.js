"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tostring = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Tostring extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.NUMBER || value.tipo == resultado_1.TipoDato.DOUBLE || value.tipo == resultado_1.TipoDato.BOOLEANO) {
            return { valor: value.valor.toString(), tipo: resultado_1.TipoDato.STRING };
        }
        else {
            // Manejo de error si el valor no es un número o booleano
            throw new Error('Error: El valor no es numérico o booleano.');
        }
    }
}
exports.Tostring = Tostring;
