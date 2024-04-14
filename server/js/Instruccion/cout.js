"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cout = void 0;
const resultado_1 = require("../Abstract/resultado");
const instruccion_1 = require("../Abstract/instruccion");
class Cout extends instruccion_1.Instruccion {
    constructor(expresion, salto, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.salto = salto;
    }
    interpretar(entorno, consola) {
        const res = this.expresion.interpretar(entorno);
        if (res.tipo == resultado_1.TipoDato.BOOLEANO) {
            res.valor == res.valor ? true : false;
        }
        if (this.salto) {
            consola.push(res.valor + "\n");
        }
        else {
            consola.push(res.valor + "");
        }
        return null;
    }
}
exports.Cout = Cout;
