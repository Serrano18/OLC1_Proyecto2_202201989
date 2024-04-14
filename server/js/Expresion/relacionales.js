"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const expresion_1 = require("../Abstract/expresion");
const resultado_1 = require("../Abstract/resultado");
class Relacional extends expresion_1.Expresion {
    // En jison deben agregar las 2 expresiones, el tipo de expresión
    // Ustedes saben eso a través de su gramática
    constructor(e1, e2, op, linea, columna) {
        super(linea, columna);
        this.Operacion = op;
        this.exp1 = e1;
        this.exp2 = e2;
    }
    interpretar(entorno) {
        const resultado1 = this.exp1.interpretar(entorno);
        const resultado2 = this.exp2.interpretar(entorno);
        console.log(resultado1, resultado2);
        if (resultado1.tipo == resultado_1.TipoDato.NULO || resultado2.tipo == resultado_1.TipoDato.NULO) {
            throw Error("Tipo de dato no se puede comparar");
        }
        if ((resultado1.tipo == resultado_1.TipoDato.NUMBER || resultado1.tipo == resultado_1.TipoDato.DOUBLE || resultado1.tipo == resultado_1.TipoDato.CHAR
            &&
                resultado2.tipo == resultado_1.TipoDato.NUMBER || resultado2.tipo == resultado_1.TipoDato.DOUBLE || resultado2.tipo == resultado_1.TipoDato.CHAR) || (resultado1.tipo == resultado_1.TipoDato.BOOLEANO && resultado2.tipo == resultado_1.TipoDato.BOOLEANO)) {
            switch (this.Operacion) {
                case resultado_1.OpRelacional.IGUAL:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor == resultado2.valor };
                case resultado_1.OpRelacional.DISTINTO:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor != resultado2.valor };
                case resultado_1.OpRelacional.MENOR:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor < resultado2.valor };
                case resultado_1.OpRelacional.MENORIGUAL:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor <= resultado2.valor };
                case resultado_1.OpRelacional.MAYOR:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor > resultado2.valor };
                case resultado_1.OpRelacional.MAYORIGUAL:
                    return { tipo: resultado_1.TipoDato.BOOLEANO, valor: resultado1.valor >= resultado2.valor };
            }
        }
        return { tipo: resultado_1.TipoDato.NULO, valor: null };
    }
}
exports.Relacional = Relacional;
