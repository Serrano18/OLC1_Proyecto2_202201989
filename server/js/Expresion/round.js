"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Round extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.NUMBER || value.tipo == resultado_1.TipoDato.DOUBLE) {
            return { valor: Math.round(value.valor), tipo: resultado_1.TipoDato.NUMBER };
        }
        else {
            // Manejo de error si el valor no es un número
            throw new Error('Error: El valor no es un número.');
        }
    }
}
exports.Round = Round;
