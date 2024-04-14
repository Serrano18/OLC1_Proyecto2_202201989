"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Length extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        console.log(value.valor);
        if (value.tipo == resultado_1.TipoDato.STRING) {
            return { valor: value.valor.length, tipo: resultado_1.TipoDato.NUMBER };
        }
        else {
            // Manejo de error si el valor no es un array o una cadena
            throw new Error('Error: El valor no es un vector, lista o cadena.');
        }
    }
}
exports.Length = Length;
