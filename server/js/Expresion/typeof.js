"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Typeof extends expresion_1.Expresion {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        if (value.tipo == resultado_1.TipoDato.NUMBER) {
            if (this.isFloat(value)) {
                return { valor: 'double', tipo: resultado_1.TipoDato.STRING };
            }
            else {
                return { valor: 'number', tipo: resultado_1.TipoDato.STRING };
            }
        }
        else if (value.tipo == resultado_1.TipoDato.BOOLEANO) {
            return { valor: 'boolean', tipo: resultado_1.TipoDato.STRING };
        }
        else if (value.tipo == resultado_1.TipoDato.STRING) {
            if (value.valor.length == 1) {
                return { valor: 'char', tipo: resultado_1.TipoDato.STRING };
            }
            else {
                return { valor: 'string', tipo: resultado_1.TipoDato.STRING };
            }
        }
        else if (Array.isArray(value.valor)) {
            return { valor: 'array', tipo: resultado_1.TipoDato.STRING };
        }
        else {
            throw new Error('Error: Saber que tipo es');
        }
    }
    isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
}
exports.Typeof = Typeof;
