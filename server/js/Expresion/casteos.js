"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Casteo extends expresion_1.Expresion {
    constructor(tipo, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.valor = valor;
    }
    interpretar(entorno) {
        const value = this.valor.interpretar(entorno);
        const tip = this.tipo;
        switch (tip) {
            case 'int':
                switch (value.tipo) {
                    case resultado_1.TipoDato.DOUBLE:
                        return { valor: parseInt(value.valor), tipo: resultado_1.TipoDato.NUMBER };
                    case resultado_1.TipoDato.CHAR:
                        return { valor: value.valor, tipo: resultado_1.TipoDato.NUMBER };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            case 'double':
                switch (value.tipo) {
                    case resultado_1.TipoDato.NUMBER:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: resultado_1.TipoDato.DOUBLE };
                    case resultado_1.TipoDato.STRING:
                        return { valor: parseFloat(value.valor).toFixed(1), tipo: resultado_1.TipoDato.DOUBLE };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            case 'char':
                switch (value.tipo) {
                    case resultado_1.TipoDato.NUMBER:
                        return { valor: String.fromCharCode(value.valor), tipo: resultado_1.TipoDato.CHAR };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            case 'std::string':
                switch (value.tipo) {
                    case resultado_1.TipoDato.NUMBER:
                        return { valor: value.valor.toString(), tipo: resultado_1.TipoDato.STRING };
                    case resultado_1.TipoDato.DOUBLE:
                        return { valor: value.valor.toString(), tipo: resultado_1.TipoDato.STRING };
                    default:
                        throw new Error('Error: Casteo no permitido');
                }
            default:
                throw new Error('Error: Tipo de dato de destino desconocido');
        }
    }
}
exports.Casteo = Casteo;
