"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Ternario extends expresion_1.Expresion {
    constructor(condicion, exp1, exp2, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    interpretar(entorno) {
        const con = this.condicion.interpretar(entorno);
        const ex1 = this.exp1.interpretar(entorno);
        const ex2 = this.exp2.interpretar(entorno);
        if (con.tipo == resultado_1.TipoDato.BOOLEANO) {
            if (con.valor) {
                return { valor: ex1.valor, tipo: ex1.tipo };
            }
            else {
                return { valor: ex2.valor, tipo: ex2.tipo };
            }
        }
        else {
            throw new Error('Error: LA CONDICION NO ES VALIDA');
        }
    }
}
exports.Ternario = Ternario;
